import React, { useState } from "react";

type DiaryEntry = {
  id: number;
  title: string;
  content: string;
};

type UpdateDiaryEntry = (entry: DiaryEntry) => void;
type DeleteDiaryEntry = (entryId: number) => void;

const DiaryEntryEditor: React.FC<{ entry: DiaryEntry; onSave: UpdateDiaryEntry; onDelete: DeleteDiaryEntry }> = ({
  entry,
  onSave,
  onDelete,
}) => {
  const [isEditing, setEditingStatus] = useState(false);
  const [editedTitle, setEditedTitle] = useState(entry.title);
  const [editedContent, setEditedContent] = useState(entry.content);
  const [errorMessage, setErrorMessage] = useState('');

  const saveChanges = () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      setErrorMessage('Title and content cannot be empty.');
      return;
    }
    onSave({
      ...entry,
      title: editedTitle.trim(),
      content: editedContent.trim(),
    });
    setEditingStatus(false);
    setErrorMessage(''); // Clear error message upon successful update
  };

  const confirmAndDelete = () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      onDelete(entry.id);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
          {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
          <button onClick={saveChanges}>Save</button>
          <button onClick={() => setEditingStatus(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{entry.title}</h2>
          <p>{entry.content}</p>
          <button onClick={() => setEditingStatus(true)}>Edit</button>
          <button onClick={confirmAndDelete} style={{marginLeft: "10px", color: 'red'}}>Delete</button>
        </div>
      )}
    </div>
  );
};

const DiaryManager: React.FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [nextEntryId, setNextEntryId] = useState(0);

  const addDiaryEntry = () => {
    const newDiaryEntry: DiaryEntry = { id: nextEntryId, title: "New Entry", content: "" };
    setDiaryEntries([...diaryEntries, newDiaryEntry]);
    setNextEntryId(nextEntryId + 1);
  };

  const saveDiaryEntry = (updatedDiaryEntry: DiaryEntry) => {
    setDiaryEntries(diaryEntries.map(entry => (entry.id === updatedDiaryEntry.id ? updatedDiaryEntry : entry)));
  };

  const deleteDiaryEntry = (entryId: number) => {
    setDiaryEntries(diaryEntries.filter(entry => entry.id !== entryId));
  };

  return (
    <div>
      <h1>Personal Diary App</h1>
      <button onClick={addDiaryEntry}>Add New Entry</button>
      {diaryEntries.map((entry) => (
        <DiaryEntryEditor key={entry.id} entry={entry} onSave={saveDiaryEntry} onDelete={deleteDiaryEntry} />
      ))}
    </div>
  );
};

export default DiaryManager;