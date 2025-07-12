import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CourseForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    content: initialData.content || '',
  });

  const { title, description, content } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          name='title'
          value={title}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          name='description'
          value={description}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as='textarea'
          rows={5}
          name='content'
          value={content}
          onChange={onChange}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default CourseForm;