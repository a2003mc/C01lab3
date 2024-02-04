const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // 用于解析JSON格式的请求体

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const dbURI = 'mongodb+srv://paulyao22:paulyao66@cluster0.efpsj0r.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    const Note = require('./models/note.model'); // 引入模型

    // 获取所有笔记
    app.get('/notes', async (req, res) => {
        try {
            const notes = await Note.find();
            res.json(notes);
        } catch (err) {
            res.status(400).json('Error: ' + err);
        }
    });
    
    // 添加新笔记
    app.post('/add', async (req, res) => {
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content
        });
    
        try {
            await newNote.save();
            res.json('Note added!');
        } catch (err) {
            res.status(400).json('Error: ' + err);
        }
    });
    
    // 更新笔记
    app.patch('/update/:id', async (req, res) => {
        try {
            const note = await Note.findById(req.params.id);
            note.title = req.body.title;
            note.content = req.body.content;
    
            await note.save();
            res.json('Note updated!');
        } catch (err) {
            res.status(400).json('Error: ' + err);
        }
    });
    
    // 删除笔记
    app.delete('/delete/:id', async (req, res) => {
        try {
            await Note.findByIdAndDelete(req.params.id);
            res.json('Note deleted.');
        } catch (err) {
            res.status(400).json('Error: ' + err);
        }
    });
    
    // 删除所有笔记
    app.delete('/deleteAll', async (req, res) => {
        try {
            await Note.deleteMany({});
            res.json('All notes deleted.');
        } catch (err) {
            res.status(400).json('Error: ' + err);
        }
    });
    
    // 在这里添加相应的路由和逻辑
    