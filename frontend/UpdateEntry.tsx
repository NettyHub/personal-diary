import React, { useState, ChangeEvent, FormEvent } from 'react';

interface UpdateDiaryEntryProps {
  initialEntry: {
    id: number;
    title: string;
    date: string;
    content: string;
  };
  onUpdateEntry: (id: number, updatedEntry: { title: string; date: string; content: string }) => void;
}

const UpdateDiaryEntry: React.FC<UpdateDiaryEntryProps> = ({ initialEntry, onUpdateEntry }) => {
  const [title, setTitle] = useState(initialEntry.title);
  const [date, setDate] = useState(initialEntry.date);
  const [content, setContent] = useState(initialEntry.content);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateEntry(initialEntry.id, { title, date, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input id="title" type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input id="date" type="date" value={date} onChange={handleDateChange} />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea id="content" value={content} onChange={handleContentChange}></textarea>
      </div>
      <button type="submit">Update Entry</button>
    </form>
  );
};

export default UpdateDiaryEntry;