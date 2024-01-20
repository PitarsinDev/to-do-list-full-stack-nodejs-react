import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch todos: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error.message));
  }, []);

  const addTodo = () => {
    if (task.trim()) {
      fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to add task');
          }
        })
        .then(data => {
          alert(data.message);
          setTask('');
          fetch('http://localhost:5000/todos')
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Error fetching todos:', error));
        })
        .catch(error => console.error('Error adding task:', error));
    }
  };

  return (
    <div>

        <div className='p-5'>
          <h1 className='text-center text-indigo-600 text-3xl'>To-Do List</h1>
        </div>

      <div className='flex justify-center pt-10'>
        <div>
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={e => setTask(e.target.value)}
            className='border border-indigo-600 px-5 rounded-full text-zinc-600'
          />
          <div className='flex justify-center py-5'>
            <button onClick={addTodo} className='bg-indigo-600 text-white rounded-full px-5 py-1 rounded-full hover:shadow-md transition'>Add Task</button>
          </div>
        </div>
      </div>
      <div className='flex justify-center pb-5'>
        <div className='w-10/12'>
          <hr />
        </div>
      </div>
      <div className='flex justify-center'>
        <ul className='text-zinc-600'>
          {todos.map(todo => (
            <li key={todo.id} className='py-2'>{todo.task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;