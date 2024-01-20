const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise')

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_list_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/todos', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM todos');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
app.post('/todos', async (req, res) => {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ error: 'Task is required' });
    }
  
    try {
      await pool.query('INSERT INTO todos (task) VALUES (?)', [task]);
      res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log('Server is running');
});