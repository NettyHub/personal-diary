const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let diaryEntries = [
    { id: 1, date: '2023-01-01', title: 'New Year', content: 'Celebrated new year at home.' },
];

const getNextId = () => {
    return diaryEntries.length === 0 ? 1 : Math.max(...diaryEntries.map(entry => entry.id)) + 1;
};

const findEntryById = (id) => {
    return diaryEntries.find(d => d.id === parseInt(id));
};

const findEntryIndexById = (id) => {
    return diaryEntries.findIndex(d => d.id === parseInt(id));
};

const isValidEntry = (entry) => {
    return entry.date && entry.title && entry.content;
};

app.get('/diary', (req, res) => {
    res.json(diaryEntries);
});

app.get('/diary/search', (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.json(diaryEntries);
    }
    const filteredEntries = diaryEntries.filter(entry =>
        entry.title.toLowerCase().includes(query.toLowerCase()) ||
        entry.content.toLowerCase().includes(query.toLowerCase()));
    res.json(filteredEntries);
});

app.get('/diary/:id', (req, res) => {
    const entry = findEntryById(req.params.id);
    if (!entry) return res.status(404).send('Diary entry not found.');
    res.json(entry);
});

app.post('/diary', (req, res) => {
    const { date, title, content } = req.body;
    if (!isValidEntry(req.body)) return res.status(400).send('Invalid data provided.');

    const id = getNextId();
    const newEntry = { id, date, title, content };
    diaryEntries.push(newEntry);
    res.status(201).send(newEntry);
});

app.put('/diary/:id', (req, res) => {
    const entry = findEntryById(req.params.id);
    if (!entry) return res.status(404).send('Diary entry not found.');

    updateEntry(entry, req.body);
    res.send(entry);
});

const updateEntry = (entry, data) => {
    const { date, title, content } = data;
    if (!isValidEntry(data)) return false;
  
    entry.date = date || entry.date;
    entry.title = title || entry.title;
    entry.content = content || entry.content;
    return true;
};

app.delete('/diary/:id', (req, res) => {
    const entryIndex = findEntryIndexById(req.params.id);
    if (entryIndex < 0) return res.status(404).send('Diary entry not found.');

    diaryEntries = diaryEntries.filter(d => d.id !== parseInt(req.params.id));
    res.send({ message: 'Diary entry deleted successfully.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});