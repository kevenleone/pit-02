import React, { useState } from 'react';
import {
  Row, Col, Form, Button,
} from 'react-bootstrap';

export default function TodoForm({ todos, setTodos }) {
  const [text, setText] = useState('');

  const onAddTodo = () => {
    setTodos([...todos, { title: text }]);
    setText('');
  };

  return (
    <Row>
      <Col xl={12} md={9}>
        <Form>
          <Form.Group>
            <Form.Control
              value={text}
              onChange={(event) => setText(event.target.value)}
              type="text"
              placeholder="Insira sua atividade do dia"
            />
          </Form.Group>
        </Form>
      </Col>
      <Col>
        <Button disabled={!text.trim()} onClick={onAddTodo} type="button">
          Adicionar Todo
        </Button>
      </Col>
    </Row>
  );
}
