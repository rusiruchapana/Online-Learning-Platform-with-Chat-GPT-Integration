import React from 'react';
import { Container } from 'react-bootstrap';
import CourseList from '../components/courses/CourseList';

const Home = () => {
  return (
    <Container>
      <h1 className='my-4'>Available Courses</h1>
      <CourseList />
    </Container>
  );
};

export default Home;