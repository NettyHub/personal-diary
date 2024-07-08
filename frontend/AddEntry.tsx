import React, { useState } from 'react';

interface DiaryEntry {
  title: string;
  date: string;
  content: string;
}

interface DiaryEntryFormProps {
  addDiaryEntry: (entry: DiaryEntry) => void;
}

const DiaryEntryForm: React.FC<DiaryEntryFormProps> = ({ addDiaryEntry }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addDiaryEntry({ title, date, content });

    setTitle('');
    setDate('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default DiaryEntryForm;