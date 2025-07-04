import React, { useState } from 'react';

const API_URL = 'http://localhost:8000';

function QuizPage() {
  const [file, setFile] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setQuiz([]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setQuiz([]);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_URL}/quiz`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setQuiz(data.quiz || []);
      if (data.error) setError(data.error);
    } catch (err) {
      setError('Failed to fetch quiz.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Generate Quiz</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} className="mb-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Quiz'}
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {quiz.length > 0 && (
        <div className="space-y-6">
          {quiz.map((qz, i) => (
            <div key={i} className="bg-blue-50 p-4 rounded shadow-inner">
              <div className="font-semibold text-purple-700 mb-2">Q{i + 1}: {qz.question}</div>
              <ul className="list-disc pl-5 mb-2">
                {qz.options.map((opt, j) => (
                  <li key={j} className="text-gray-700">{opt}</li>
                ))}
              </ul>
              <div className="text-green-600 mt-1 font-bold">Answer: {qz.answer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizPage; 