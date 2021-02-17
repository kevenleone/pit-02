import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const TodoList = ({ todos, setTodos }) => {
  const onCompleteTodo = ({ target: { checked } }, index) => {
    const newTodos = todos.map((todo, _index) => {
      if (index === _index) {
        return {
          ...todo,
          completed: checked,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const onRemoveTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);

    setTodos(newTodos);
  };

  const onEditTodo = (index) => {
    const newTodos = todos.map((todo, todoIndex) => {
      if (todoIndex === index) {
        return {
          ...todo,
          edit: !todo.edit,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const onChangeTodo = (event, index) => {
    const newTodos = todos.map((todo, todoIndex) => {
      if (todoIndex === index) {
        return {
          ...todo,
          title: event.target.value,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <Row>
      <div className="todos">
        {todos.map((todo, index) => (
          <Row className="todo m-2">
            <Col xl={8}>
              <input
                onChange={(event) => onCompleteTodo(event, index)}
                checked={todo.completed}
                className="m-2"
                type="checkbox"
              />

              {todo.edit ? (
                <input
                  value={todo.title}
                  onChange={(event) => onChangeTodo(event, index)}
                />
              ) : (
                <span className={todo.completed ? 'completed' : ''}>
                  {`Index: ${index} - ${todo.title}`}
                </span>
              )}
            </Col>
            <Col>
              <Button onClick={() => onEditTodo(index)}>Editar</Button>
              <Button
                onClick={() => onRemoveTodo(index)}
                className="ml-2"
                variant="danger"
              >
                Remover
              </Button>
            </Col>
          </Row>
        ))}
      </div>
    </Row>
  );
};

export default TodoList;
