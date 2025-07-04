# Study Helper Frontend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Install Tailwind CSS and dependencies:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
3. Start the development server:
   ```bash
   npm start
   ```

- The app will run at http://localhost:3000
- Make sure the backend (FastAPI) is running at http://localhost:8000

## Features
- Upload PDF or DOCX files
- Choose between Summary, Flashcards, or Quiz
- View and download/copy results
- Responsive, clean UI with Tailwind CSS 