import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const API_URL = 'http://localhost:8000';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login - you can add real authentication later
    setTimeout(() => {
      onLogin({ email });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="bg-white/80 rounded-3xl shadow-2xl px-8 py-12 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-block bg-gradient-to-tr from-blue-500 to-purple-500 p-3 rounded-full shadow-lg">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            </span>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">Study Helper</h1>
          </div>
          <p className="text-gray-600">Sign in to access your study tools</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [file, setFile] = useState(null);
  const [option, setOption] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setOption('');
    setResult(null);
    setError('');
  };

  const handleOptionClick = async (opt) => {
    if (!file) return;
    setOption(opt);
    setResult(null);
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    let endpoint = '/summarize';
    if (opt === 'quiz') endpoint = '/quiz';
    try {
      const res = await fetch(API_URL + endpoint, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
      if (data.error) setError(data.error);
    } catch (err) {
      setError('Failed to fetch results.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-white/80 rounded-3xl shadow-2xl px-8 py-12 max-w-2xl w-full flex flex-col items-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block bg-gradient-to-tr from-blue-500 to-purple-500 p-3 rounded-full shadow-lg">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </span>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text drop-shadow">Study Helper</h1>
        </div>
        <p className="text-lg text-gray-700 mb-6 text-center">Instantly generate summaries and quizzes from your study materials. Upload a PDF, DOCX, or TXT file and let AI do the rest!</p>
        <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} className="mb-4" />
        {file && (
          <div className="mb-4 text-blue-700 font-semibold">Selected: {file.name}</div>
        )}
        <div className="flex gap-4 mt-2">
          <button onClick={() => handleOptionClick('summary')} disabled={!file || loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow transition disabled:opacity-50">Summary</button>
          <button onClick={() => handleOptionClick('quiz')} disabled={!file || loading} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow transition disabled:opacity-50">Quiz</button>
        </div>
        {loading && <div className="mt-4 text-blue-600 font-semibold">Processing...</div>}
        {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}
        {result && option === 'summary' && result.summary && (
          <div className="mt-8 bg-blue-50 p-4 rounded shadow-inner w-full">
            <h3 className="font-semibold mb-2">Summary:</h3>
            <div className="whitespace-pre-line">{result.summary}</div>
          </div>
        )}
        {result && option === 'quiz' && result.quiz && (
          <div className="mt-8 space-y-6 w-full">
            {result.quiz.map((qz, i) => (
              <div key={i} className="bg-blue-50 p-4 rounded shadow-inner">
                <div className="font-semibold text-purple-700 mb-2">Q{i + 1}: {qz.question}</div>
                <ul className="list-disc pl-5 mb-2">
                  {qz.options.map((opt, j) => (
                    <li key={j} className="text-gray-700">{opt}</li>
                  ))}
                </ul>
                <div className="text-green-600 mt-1 font-bold">
                  Answer: {typeof qz.answer === 'string' && qz.answer.length === 1 && 'ABCD'.includes(qz.answer)
                    ? qz.options['ABCD'.indexOf(qz.answer)]
                    : qz.answer}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="mt-16 text-gray-400 text-sm text-center select-none">
        <span>&copy; {new Date().getFullYear()} Study Helper &mdash; Crafted with <span className="text-pink-400">♥</span> for learners</span>
      </footer>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Router>
        <nav className="bg-white/90 shadow sticky top-0 z-50 px-6 py-3 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-700 hover:opacity-80">
            <span className="inline-block bg-gradient-to-tr from-blue-500 to-purple-500 p-1 rounded-full">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            </span>
            Study Helper
          </Link>
          <div className="flex gap-4 ml-auto">
            <span className="text-gray-600">Welcome, {user.email}</span>
            <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">Logout</button>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
