# 📚 Study Helper

A modern, AI-powered study assistant that helps students generate summaries and quizzes from their study materials. Built with FastAPI backend and React frontend.

![Study Helper](https://img.shields.io/badge/Study-Helper-blue?style=for-the-badge&logo=book)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- **📄 Multi-format Support**: Upload PDF, DOCX, and TXT files
- **🤖 AI-Powered Generation**: Uses advanced AI models for content analysis
- **📝 Smart Summaries**: Generate concise, comprehensive summaries
- **❓ Interactive Quizzes**: Create multiple-choice questions with explanations
- **🎨 Beautiful UI**: Modern, responsive design with glass-morphism effects
- **🔐 User Authentication**: Secure login system (ready for backend integration)
- **⚡ Fast Processing**: Optimized for quick results

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- OpenRouter API key (free tier available)

## ⚠️ Windows & PowerShell Virtual Environment Activation

If your project path contains spaces or you see a `bin` directory (instead of `Scripts`) after running `python -m venv venv`, activate your virtual environment in PowerShell with:

```
.\venv\bin\Activate.ps1
```

If you see a `Scripts` directory, use:

```
. .\venv\Scripts\activate
```

If you get a security error, run:

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🏁 Step-by-Step: How to Run This Project

1. **Clone the repository**
   ```powershell
   git clone https://github.com/yourusername/study-helper.git
   cd study-helper
   ```

2. **Backend Setup**
   ```powershell
   cd backend
   python -m venv venv
   # If you see a 'bin' directory:
   .\venv\bin\Activate.ps1
   # If you see a 'Scripts' directory:
   . .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   - Create a `.env` file in the `backend` directory with your OpenRouter API key:
     ```env
     OPENROUTER_API_KEY=your_openrouter_api_key_here
     ```

4. **Frontend Setup**
   ```powershell
   cd ../frontend
   npm install
   ```

5. **Start the Application**
   - **Backend (Terminal 1):**
     ```powershell
     cd backend
     # Activate venv as above
     uvicorn main:app --reload --host 0.0.0.0 --port 8000
     ```
   - **Frontend (Terminal 2):**
     ```powershell
     cd frontend
     npm start
     ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 📖 Usage

### 1. Login
- Enter any email and password (currently simulated)
- Click "Sign In" to access the application

### 2. Upload Document
- Click "Choose File" to select your study material
- Supported formats: PDF, DOCX, TXT
- Maximum file size: 10MB

### 3. Generate Content
- **Summary**: Get a concise overview of the document
- **Quiz**: Create multiple-choice questions with answers

### 4. View Results
- Results are displayed in a clean, readable format
- Quiz questions include explanations
- Copy or save results for later use

## 🔧 API Documentation

### Endpoints

#### POST `/summarize`
Generate a summary from uploaded document.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (PDF, DOCX, or TXT)

**Response:**
```json
{
  "summary": "Generated summary text..."
}
```

#### POST `/quiz`
Generate quiz questions from uploaded document.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (PDF, DOCX, or TXT)

**Response:**
```json
{
  "quiz": [
    {
      "question": "What is the main topic?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A"
    }
  ]
}
```

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework
- **Python-docx**: DOCX file processing
- **PyPDF2**: PDF file processing
- **OpenAI/OpenRouter**: AI model integration
- **Uvicorn**: ASGI server

### Frontend
- **React**: User interface library
- **React Router**: Navigation
- **Tailwind CSS**: Styling framework
- **Axios**: HTTP client

## 📁 Project Structure

```
study-helper/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   └── index.js        # React entry point
│   ├── package.json        # Node.js dependencies
│   └── tailwind.config.js  # Tailwind configuration
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## 🔑 API Key Setup

1. **Get OpenRouter API Key**
   - Visit [OpenRouter](https://openrouter.ai/)
   - Sign up for a free account
   - Generate an API key

2. **Configure Environment**
   - Add your API key to `backend/.env`
   - Never commit API keys to version control

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Install Heroku CLI
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint for JavaScript code
- Write meaningful commit messages
- Add tests for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai/) for AI model access
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [React](https://reactjs.org/) for the frontend library
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/study-helper/issues)
- **Email**: your.email@example.com
- **Discord**: [Join our community](https://discord.gg/your-server)

---

<div align="center">
  <p>Made with ❤️ for students everywhere</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div> 
</div> 