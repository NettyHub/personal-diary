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

const DiaryEntries: React.FC<DiaryEntriesProps> = ({ entries, onUpdate, onDelete }) => (
  <ul>
    {entries.map(({ id, title, date, content }) => (
      <li key={id}>
        <h2>{title}</h2>
        <p><em>{date}</em></p>
        {/* Limiting content display to 100 characters for preview */}
        <p>{content.length > 100 ? `${content.substring(0, 100)}...` : content}</p>
        <button onClick={() => onUpdate(id)}>Update</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default DiaryEntries;