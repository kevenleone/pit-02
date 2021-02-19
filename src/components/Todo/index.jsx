import React, { useState, useEffect } from 'react';
import axios from '../../utils/api';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

export default function index() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await axios.get('/todo');
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
