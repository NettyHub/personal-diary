const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const entrySchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Title is required'] },
    content: { type: String, required: [true, 'Content is required'] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'Username is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    created_at: { type: Date, default: Date.now },
    entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entry' }]
});

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Username or email already exists'));
    } else {
        next(error);
    }
});

entrySchema.post('save', function(error, doc, next) {
    if (error.name === 'ValidationError') {
        next(new Error('Validation failed while saving entry'));
    } else {
        next(error);
    }
});

const Entry = mongoose.model('Entry', entryUtilsentrySchema);
const User = mongoose.model('User', userSchema);

module.exports = { Entry, User };