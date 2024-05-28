const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let diaryEntries = [
    { id: 1, date: '2023-01-01', title: 'New Year', content: 'Celebrated new year at home.' },
];

app.get('/diary', (req, res) => {
    res.json(diaryEntries);
});

app.get('/diary/:id', (req, res) => {
    const entry = diaryEntries.find(d => d.id === parseInt(req.params.id));
    if (!entry) return res.status(404).send('Diary entry not found.');
    res.json(entry);
});

app.post('/diary', (req, res) => {
    const { date, title, content } = req.body;
    const id = diaryEntries.length + 1;
    const newEntry = { id, date, title, content };
    diaryEntries.push(newEntry);
    res.status(201).send(newEntry);
});

app.put('/diary/:id', (req, res) => {
    const entry = diaryEntries.find(d => d.id === parseInt(req.params.id));
    if (!entry) return res.status(404).send('Diary entry not found.');

    const { date, title, content } = req.body;
    entry.date = date;
    entry.title = title;
    entry.content = content;
    res.send(entry);
});

app.delete('/diary/:id', (req, res) => {
    const entryIndex = diaryEntries.findIndex(d => d.id === parseInt(req.params.id));
    if (entryIndex < 0) return res.status(404).send('Diary entry not found.');

    diaryEntries = diaryEntries.filter(d => d.id !== parseInt(req.params.id));
    res.send({ message: 'Diary entry deleted successfully.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});