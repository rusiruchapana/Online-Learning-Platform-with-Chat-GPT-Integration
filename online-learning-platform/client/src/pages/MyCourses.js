import React, { useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourses } from '../services/courseService';
import CourseCard from '../components/courses/CourseCard';

const MyCourses = () => {
  const dispatch = useDispatch();
  const { enrolledCourses, loading, error } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const courses = await getEnrolledCourses(user.token);
        dispatch({ type: 'SET_ENROLLED_COURSES', payload: courses });
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };
    fetchEnrolledCourses();
  }, [dispatch, user.token]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h1 className="my-4">My Enrolled Courses</h1>
      {enrolledCourses.length === 0 ? (
        <p>You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="row">
          {enrolledCourses.map((course) => (
            <div key={course._id} className="col-md-4 mb-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default MyCourses;