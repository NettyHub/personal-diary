import React from 'react';

type Entry = {
  id: number;
  title: string;
  date: string;
  content: string;
};

type DiaryEntriesProps = {
  entries: Entry[];
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
};

const DiaryEntries: React.FC<DiaryEntriesProps> = ({ entries, onUpdate, onDelete }) => {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          <h2>{entry.title}</h2>
          <p><em>{entry.date}</em></p>
          <p>{entry.content.substring(0, 100)}...</p>
          <button onClick={() => onUpdate(entry.id)}>Update</button>
          <button onClick={() => onDelete(entry.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default DiaryEntries;