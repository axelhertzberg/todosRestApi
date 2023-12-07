const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const todos = [{
    id: 100,
    text: "This is a todo with id",
    done: "False"
}];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Get a specific todo by ID
app.get('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((t) => t.id === parseInt(todoId));

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Create a new todo
app.post('/todos', (req, res) => {
  const newTodo = req.query;
  newTodo.id = todos.length + 1;
  if (!newTodo.text) return res.status(401).json(JSON.stringify({error: "Todo must have a text"}))
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo by ID
app.put('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;
  const index = todos.findIndex((t) => t.id === parseInt(todoId));

  if (index !== -1) {
    todos[index] = { ...todos[index], ...updatedTodo };
    res.json(todos[index]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const index = todos.findIndex((t) => t.id === parseInt(todoId));
    console.log("delete id", index)
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo[0]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(todos)
});
