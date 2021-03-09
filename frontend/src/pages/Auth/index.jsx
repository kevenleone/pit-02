import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Page from '../../components/Card';
import axios from '../../utils/api';
import { tokenKey } from '../../utils/constants';

export default function Login({ history }) {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  });

  const onChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = form;

    try {
      if (isLogin) {
        const response = await axios.post('/auth', { email, password });
        localStorage.setItem(tokenKey, response.data.token);
        toast.info('User logged with success');
        history.push('/home');
      } else {
        await axios.post('/user', form);
        toast.info('User created success');
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container className="mt-5">
      <Page title={isLogin ? 'Login' : 'Create new User'}>
        <Form onSubmit={onSubmit}>
          {!isLogin && (
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
            />
          </Form.Group>
          )}

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={onChange}
              type="text"
              name="email"
              value={form.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={onChange}
              type="password"
              name="password"
              value={form.password}
            />
          </Form.Group>

          <Button type="submit">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>

          <Button variant="outline-primary ml-3" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create new User' : 'Login'}
          </Button>

        </Form>
      </Page>
    </Container>
  );
}
