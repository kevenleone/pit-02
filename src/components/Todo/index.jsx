import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../../utils/api';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

export default function index() {
  const [todos, setTodos] = useState([]);
  const [todoError, setTodoError] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/todo');
      setTodos(response.data);
    } catch (e) {
      toast.error(e.message);
      setTodoError(e.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <TodoForm
        todos={todos}
        setTodos={setTodos}
      />
      <TodoList
        todoError={todoError}
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
}
