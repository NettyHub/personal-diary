import React, { useState } from "react";

type DiaryEntry = {
  id: number;
  title: string;
  content: string;
};

type UpdateEntryFunction = (entry: DiaryEntry) => void;
type RemoveEntryFunction = (entryId: number) => void;

const DiaryEntryComponent: React.FC<{ entry: DiaryEntry; onUpdate: UpdateEntryFunction; onRemove: RemoveEntryFunction }> = ({
  entry,
  onUpdate,
  onRemove,
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

  const handleRemove = () => {
    // Confirm with the user before removing the entry
    if (window.confirm("Are you sure you want to delete this entry?")) {
      onRemove(entry.id);
    }
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
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{entry.title}</h2>
          <p>{entry.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleRemove} style={{marginLeft: "10px", color: 'red'}}>Delete</button>
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

  const removeEntry = (entryId: number) => {
    setEntries(entries.filter(entry => entry.id !== entryId));
  };

  return (
    <div>
      <h1>Personal Diary App</h1>
      <button onClick={addNewEntry}>Add New Entry</button>
      {entries.map((entry) => (
        <DiaryEntryComponent key={entry.id} entry={entry} onUpdate={updateEntry} onRemove={removeEntry} />
      ))}
    </div>
  );
};

export default DiaryApp;