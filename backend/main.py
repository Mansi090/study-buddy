from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

app = FastAPI(title="Study Helper API", description="API for summarizing, generating flashcards, and quizzes from study material.")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("OPENROUTER_API_KEY:", os.getenv("OPENROUTER_API_KEY"))

def extract_text_from_file(contents, filename):
    if filename.lower().endswith('.pdf'):
        from PyPDF2 import PdfReader
        import io
        reader = PdfReader(io.BytesIO(contents))
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    elif filename.lower().endswith('.docx'):
        from docx import Document
        import io
        doc = Document(io.BytesIO(contents))
        text = " ".join([para.text for para in doc.paragraphs])
        return text
    else:
        try:
            return contents.decode("utf-8")
        except UnicodeDecodeError:
            return contents.decode("latin-1")

@app.post("/summarize")
async def summarize(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text_from_file(contents, file.filename)
    prompt = f"Summarize the following study material in a concise paragraph:\n{text}"
    completion = client.chat.completions.create(
        model="deepseek/deepseek-r1-0528:free",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that summarizes study material."},
            {"role": "user", "content": prompt}
        ]
    )
    summary = completion.choices[0].message.content
    return {"summary": summary.strip()}

@app.post("/flashcards")
async def flashcards(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text_from_file(contents, file.filename)
    prompt = (
        "Generate a list of flashcards (question and answer pairs) from the following study material. "
        "Format each as: Q: <question>\nA: <answer>\n---\n"
        f"{text}"
    )
    completion = client.chat.completions.create(
        model="deepseek/deepseek-r1-0528:free",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that creates flashcards from study material."},
            {"role": "user", "content": prompt}
        ]
    )
    flashcards_text = completion.choices[0].message.content
    # Parse flashcards into a list
    flashcards = []
    for block in flashcards_text.split('---'):
        lines = [line.strip() for line in block.strip().split('\n') if line.strip()]
        if len(lines) >= 2 and lines[0].startswith('Q:') and lines[1].startswith('A:'):
            question = lines[0][2:].strip()
            answer = lines[1][2:].strip()
            flashcards.append({"question": question, "answer": answer})
    return {"flashcards": flashcards}

@app.post("/quiz")
async def quiz(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text_from_file(contents, file.filename)
    prompt = (
        "Generate 5 quiz questions with 4 options each and the correct answer from the following study material. "
        "Format each as: Q: <question>\nA. <option1>\nB. <option2>\nC. <option3>\nD. <option4>\nAnswer: <correct option letter>\n---\n"
        f"{text}"
    )
    completion = client.chat.completions.create(
        model="deepseek/deepseek-r1-0528:free",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that creates multiple-choice quiz questions from study material."},
            {"role": "user", "content": prompt}
        ]
    )
    quiz_text = completion.choices[0].message.content
    # Parse quiz into a list
    quiz = []
    for block in quiz_text.split('---'):
        lines = [line.strip() for line in block.strip().split('\n') if line.strip()]
        if len(lines) >= 6 and lines[0].startswith('Q:') and lines[1].startswith('A.'):
            question = lines[0][2:].strip()
            options = [l[2:].strip() for l in lines[1:5] if l.startswith(('A.', 'B.', 'C.', 'D.'))]
            answer_line = [l for l in lines if l.startswith('Answer:')]
            answer = answer_line[0][7:].strip() if answer_line else ''
            quiz.append({"question": question, "options": options, "answer": answer})
    return {"quiz": quiz} 