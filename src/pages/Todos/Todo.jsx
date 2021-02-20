import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import axios from '../../utils/api';
import Card from '../../components/Card';

export default function Todo() {
  const { id } = useParams();
  const [todo, setTodo] = useState({});

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`/todo/${id}`);
      setTodo(response.data);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <Container className="mt-5">
      <Card title="Todo">
        <h2>
          {`title: ${todo.title}`}
        </h2>
      </Card>
    </Container>
  );
}
