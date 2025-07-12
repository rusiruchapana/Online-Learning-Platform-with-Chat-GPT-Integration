import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../services/courseService';
import CourseCard from './CourseCard';
import { Spinner } from 'react-bootstrap';

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.course);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses();
        dispatch({ type: 'SET_COURSES', payload: coursesData });
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, [dispatch]);

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="row">
      {courses.map((course) => (
        <div key={course._id} className="col-md-4 mb-4">
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
};

export default CourseList;