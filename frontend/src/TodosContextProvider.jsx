import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TodosContext from './TodosContext';
import axios from './utils/api';

const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/todo');
      setTodos(response.data);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodosContext.Provider value={[todos, setTodos]}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
