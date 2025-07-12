import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCourse, enrollCourse } from '../../services/courseService';
import { Button, Card, Spinner, Alert } from 'react-bootstrap';

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { course, loading, error } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourse(id);
        dispatch({ type: 'SET_CURRENT_COURSE', payload: courseData });
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id, dispatch]);

  const handleEnroll = async () => {
    try {
      const result = await enrollCourse(id, user.token);
      dispatch({ type: 'ENROLL_COURSE', payload: result.course });
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{course?.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Instructor: {course?.instructor?.username}
        </Card.Subtitle>
        <Card.Text>{course?.description}</Card.Text>
        <Card.Text>{course?.content}</Card.Text>
        {user?.role === 'student' && (
          <Button variant="primary" onClick={handleEnroll}>
            Enroll
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default CourseDetails;