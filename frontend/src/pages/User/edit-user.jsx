import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Card from '../../components/Card';
import api from '../../utils/api';

export default function edit({ history, match: { params: { id } } }) {
  const isNewUser = id === 'new';

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const fetchUser = async () => {
    const response = await api.get(`/user/${id}`);
    setForm(response.data.user);
  };

  useEffect(() => {
    if (!isNewUser) {
      fetchUser();
    }
  }, [id, isNewUser]);

  const onChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isNewUser) {
        await api.post('/user', form);
        toast.info('User created success');
      } else {
        await api.put(`/user/${id}`, form);
        toast.info('User updated success');
      }

      history.push('/user');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Container className="mt-5">
      <Card title={isNewUser ? 'Create User' : 'Update User'}>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
            />
          </Form.Group>

          <Button type="submit">Save Form</Button>
        </Form>
      </Card>
    </Container>
  );
}
