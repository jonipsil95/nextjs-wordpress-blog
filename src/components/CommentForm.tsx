'use client';

import { useState } from 'react';

export default function CommentForm() {
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setComment('');
      setSubmitted(false);
    }, 2000); 
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 p-4 border rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Write a Comment</h2>
      <textarea
        className="w-full border p-2 rounded resize-none"
        rows={4}
        placeholder="Write your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={submitted}
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={submitted || comment.trim() === ''}
      >
        {submitted ? 'Thanks for your comment!' : 'Send Comment'}
      </button>
    </form>
  );
}
