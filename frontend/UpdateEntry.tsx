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
    date: initial
    .date,
    content: initialEntry.content,
  });

  const [error, setError] = useState<string | null>(null);

  const validateEntry = (entry: Omit<DiaryEntry, 'id'>) => {
    if (!entry.title || !entry.date || !entry.content) {
      return "All fields must be filled.";
    }
	   // Additional validation logic could be implemented here.
    return null;
  };

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    // Reset error state upon user correcting input.
    setError(null);
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
    setError(null);  // Also reset any error state on form reset.
  };

  const handleSubmit = (e: React.FormElement<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateEntry(entry);
    if (validationError) {
      setError(validationError);
      return;
    }
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
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" value={entry.content} onChange={handleChange}></textarea>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Update Entry</button>
      <button type="button" onClick={resetFrom}>Reset</button>
    </form>
  );
};

export default UpdateDiaryEntry;