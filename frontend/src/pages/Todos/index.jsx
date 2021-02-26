import React from 'react';
import { Container } from 'react-bootstrap';

import TodoForm from '../../components/Todo/TodoForm';
import TodoList from '../../components/Todo/TodoList';
import Card from '../../components/Card';
import TodosContextProvider from '../../TodosContextProvider';

const TodoPage = () => (
  <TodosContextProvider>
    <Container>
      <Card title="Todo App" className="m-4">
        <h3>Minhas atividades...</h3>

        <TodoForm />
        <TodoList />
      </Card>
    </Container>
  </TodosContextProvider>
);

export default TodoPage;
