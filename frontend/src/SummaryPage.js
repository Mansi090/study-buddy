import React, { useState } from 'react';

const API_URL = 'http://localhost:8000';

function SummaryPage() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setSummary('');
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_URL}/summarize`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setSummary(data.summary || '');
      if (data.error) setError(data.error);
    } catch (err) {
      setError('Failed to fetch summary.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Summarize Your Document</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} className="mb-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'Summarizing...' : 'Generate Summary'}
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {summary && (
        <div className="bg-blue-50 p-4 rounded shadow-inner">
          <h3 className="font-semibold mb-2">Summary:</h3>
          <div className="whitespace-pre-line">{summary}</div>
        </div>
      )}
    </div>
  );
}

export default SummaryPage; 