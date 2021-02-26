import React, { useState, useContext } from 'react';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import TodosContext from '../../TodosContext';
import axios from '../../utils/api';

export default function TodoForm() {
  const [todos, setTodos] = useContext(TodosContext);

  const [text, setText] = useState('');

  const onAddTodo = async (event) => {
    event.preventDefault();

    const data = {
      completed: false,
      title: text,
    };

    try {
      const response = await axios.post('/todo', data);
      toast(`Todo [${text}], created !`);
      setTodos([...todos, response.data]);
      setText('');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Form onSubmit={onAddTodo}>
      <Row>
        <Col xl={12} md={9}>
          <Form.Group>
            <Form.Control
              value={text}
              onChange={(event) => setText(event.target.value)}
              type="text"
              placeholder="Insira sua atividade do dia"
            />
          </Form.Group>
        </Col>
        <Col>
          <Button disabled={!text.trim()} type="submit">
            Adicionar Todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
