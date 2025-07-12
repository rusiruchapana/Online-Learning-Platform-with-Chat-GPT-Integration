import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Card className='mb-3'>
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Text>{course.description.substring(0, 100)}...</Card.Text>
        <Link to={`/courses/${course._id}`} className='btn btn-primary'>
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;