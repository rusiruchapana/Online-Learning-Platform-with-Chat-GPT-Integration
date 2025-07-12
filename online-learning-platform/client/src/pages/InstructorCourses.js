import React, { useState, useEffect } from 'react';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getInstructorCourses, createCourse } from '../services/courseService';
import CourseCard from '../components/courses/CourseCard';
import CourseForm from '../components/courses/CourseForm';
import Modal from 'react-bootstrap/Modal';

const InstructorCourses = () => {
  const dispatch = useDispatch();
  const { instructorCourses, loading, error } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth); // Added this line to get user from Redux store
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await getInstructorCourses(user.token);
        dispatch({ type: 'SET_INSTRUCTOR_COURSES', payload: courses });
      } catch (error) {
        console.error('Error fetching instructor courses:', error);
      }
    };
    
    if (user) { // Added check to ensure user exists
      fetchCourses();
    }
  }, [dispatch, user]); // Added user to dependency array

  const handleCreateCourse = async (courseData) => {
    try {
      const newCourse = await createCourse(courseData, user.token);
      dispatch({ type: 'ADD_COURSE', payload: newCourse });
      setShowModal(false);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Courses</h1>
        <Button onClick={() => setShowModal(true)}>Create New Course</Button>
      </div>

      {instructorCourses.length === 0 ? (
        <p>You haven't created any courses yet.</p>
      ) : (
        <div className="row">
          {instructorCourses.map((course) => (
            <div key={course._id} className="col-md-4 mb-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CourseForm onSubmit={handleCreateCourse} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default InstructorCourses;