import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const { username, password, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, password, role }));
    navigate('/dashboard');
  };

  return (
    <Card className='mt-5'>
      <Card.Body>
        <h2 className='text-center mb-4'>Register</h2>
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
          <Form.Group className='mb-3'>
            <Form.Label>Role</Form.Label>
            <Form.Select
              name='role'
              value={role}
              onChange={onChange}
              required
            >
              <option value='student'>Student</option>
              <option value='instructor'>Instructor</option>
            </Form.Select>
          </Form.Group>
          <Button type='submit' className='w-100'>
            Register
          </Button>
        </Form>
        <div className='text-center mt-3'>
          Already have an account? <Link to='/login'>Login</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Register;