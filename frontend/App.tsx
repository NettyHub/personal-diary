import React, { useState } from "react";

type DiaryEntry = {
  id: number;
  title: string;
  content: string;
};

const DiaryEntryComponent: React.FC<{ entry: DiaryEntry; onUpdate: (entry: DiaryEntry) => void }> = ({
  entry,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content);

  const handleUpdate = () => {
    onUpdate({
      ...entry,
      title,
      content,
    });
    setIsEditing(false);
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
    setEntries(entries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry));
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