import React, { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

export default function index() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
