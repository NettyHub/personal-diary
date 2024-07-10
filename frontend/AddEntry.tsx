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

  const validateForm = () => {
    let isValid = true;
    let errors = { title: '', date: '', content: '' };

    if (!title) {
      errors.title = 'Title cannot be empty';
      isValid = false;
    }
    if (!date) {
      errors.date = 'Date cannot be empty';
      isValid = false;
    }
    if (!content) {
      errors.content = 'Content cannot be empty';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    addDiaryEntry({ title, date, content });

    setTitle('');
    setDate('');
    setContent('');
    setErrors({ title: '', date: '', content: '' });
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