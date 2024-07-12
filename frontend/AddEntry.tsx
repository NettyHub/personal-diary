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

  const [errors, setErrors] = useState({
    title: '',
    date: '',
    content: '',
  });

  const validateForm = (): boolean => {
    let isValid = true;
    let errors = { title: '', date: '', content: '' };

    // Ensures strings are treated safely
    const safeTrim = (str: string) => str.trim();

    if (!safeTrim(title)) {
      errors.title = 'Title cannot be empty';
      isValid = false;
    }
    if (!safeTrim(date)) {
      errors.date = 'Date cannot be empty';
      isValid = false;
    }
    if (!safeTrim(content)) {
      errors.content = 'Content cannot be empty';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }

      const newEntry = { title, date, content };
      // Additional validation or sanitization can be performed here if necessary
      addDiaryEntry(newEntry);

      setTitle('');
      setDate('');
      setContent('');
      setErrors({ title: '', date: '', content: '' });
    } catch(error) {
      console.error("Failed to submit entry:", error);
      // Implement or invoke more sophisticated error handling/logic as needed
      // Optionally, set error state for user feedback
      setErrors(prev => ({ ...prev, content: "An unexpected error occurred. Please try again."}));
    }
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
        {errors.title && <div style={{color: 'red'}}>{errors.title}</div>}
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
        {errors.date && <div style={{color: 'red'}}>{errors.date}</div>}
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {errors.content && <div style={{color: 'red'}}>{errors.content}</div>}
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default DiaryEntryForm;