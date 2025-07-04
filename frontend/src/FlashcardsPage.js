import React, { useState } from 'react';

const API_URL = 'http://localhost:8000';

function FlashcardsPage() {
  const [file, setFile] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFlashcards([]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setFlashcards([]);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_URL}/flashcards`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setFlashcards(data.flashcards || []);
      if (data.error) setError(data.error);
    } catch (err) {
      setError('Failed to fetch flashcards.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Generate Flashcards</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} className="mb-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {flashcards.length > 0 && (
        <div className="space-y-4">
          {flashcards.map((fc, i) => (
            <div key={i} className="bg-blue-50 p-4 rounded shadow-inner">
              <div className="font-semibold text-purple-700 mb-1">Q: {fc.question}</div>
              <div className="text-gray-800">A: {fc.answer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlashcardsPage; 