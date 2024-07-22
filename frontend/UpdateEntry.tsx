import React, { useState, useCallback } from 'react';

interface DiaryEntry {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface UpdateDiaryEntryProps {
  initialEntry: DiaryEntry;
  onUpdateEntry: (id: number, updatedEntry: Omit<DiaryEntry, 'id'>) => void;
}

const UpdateDiaryEntry: React.FC<UpdateDiaryEntryProps> = ({ initialEntry, onUpdateEntry }) => {
  const [entry, setEntry] = useState<Omit<DiaryEntry, 'id'>>({
    title: initialEntry.title,
    date: initialEntry.date,
    content: initialEntry.content,
  });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEntry(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const resetForm = () => {
    setEntry({
      title: initialEntry.title,
      date: initialEntry.date,
      content: initialEntry.content,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateEntry(initialEntry.id, entry);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input id="title" name="title" type="text" value={entry.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input id="date" name="date" type="date" value={entry.date} onChange={handleChange} />
      </v>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" value={entry.content} onChange={handleChange}></textarea>
      </div>
      <button type="submit">Update Entry</button>
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
};

export default UpdateDiaryEntry;