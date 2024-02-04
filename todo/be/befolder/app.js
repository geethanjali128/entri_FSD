const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://javvadirakesh:rakesh123@cluster0.4nphiri.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('MongoDB connected') })
    .catch((err) => { console.log(err) })


const Todo = mongoose.model('Todo', {
  text: String,
  completed: Boolean
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new todo
app.post('/todos', async (req, res) => {
  const { text, completed } = req.body;

  try {
    const todo = new Todo({ text, completed });
    console.log(todo)
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  // const { text, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body);
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  console.log("req.params",req.params)
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
