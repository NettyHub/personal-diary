import React, { useState } from "react";

type DiaryEntry = {
  id: number;
  title: string;
  content: string;
};

type UpdateEntryFunction = (entry: DiaryEntry) => void;

const DiaryEntryComponent: React.FC<{ entry: DiaryEntry; onUpdate: UpdateEntryFunction }> = ({
  entry,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content);
  const [error, setError] = useState('');

  const handleUpdate = () => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }
    onUpdate({
      ...entry,
      title: title.trim(),
      content: content.trim(),
    });
    setIsEditing(false);
    setError(''); // Reset error message upon successful update
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {error && <p style={{color: 'red'}}>{error}</p>}
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{entry.title}</h2>
          <p>{entry.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

const DiaryApp: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [nextId, setNextId] = useState(0);

  const addNewEntry = () => {
    const newEntry: DiaryEntry = { id: nextId, title: "New Entry", content: "" };
    setEntries([...entries, newEntry]);
    setNextId(nextId + 1);
  };

  const updateEntry = (updatedEntry: DiaryEntry) => {
    setEntries(entries.map(entry => (entry.id === updatedEntry.id ? updatedEntry : entry)));
  };

  return (
    <div>
      <h1>Personal Diary App</h1>
      <button onClick={addNewEntry}>Add New Entry</button>
      {entries.map((entry) => (
        <DiaryEntryComponent key={entry.id} entry={entry} onUpdate={updateEntry} />
      ))}
    </div>
  );
};

export default DiaryApp;