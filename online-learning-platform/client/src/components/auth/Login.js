import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
    navigate('/dashboard');
  };

  return (
    <Card className='mt-5'>
      <Card.Body>
        <h2 className='text-center mb-4'>Login</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={onSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              name='username'
              value={username}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Button type='submit' className='w-100'>
            Login
          </Button>
        </Form>
        <div className='text-center mt-3'>
          Don't have an account? <Link to='/register'>Register</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Login;