import axios from 'axios';

const API_URL = '/api/courses';

// Get all courses
const getCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single course
const getCourse = async (courseId) => {
  const response = await axios.get(`${API_URL}/${courseId}`);
  return response.data;
};

// Create course (instructor only)
const createCourse = async (courseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, courseData, config);
  return response.data;
};

// Enroll in course (student only)
const enrollCourse = async (courseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/${courseId}/enroll`, {}, config);
  return response.data;
};

// Get enrolled courses (student only)
const getEnrolledCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/student/enrolled`, config);
  return response.data;
};

// Get instructor courses
const getInstructorCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/instructor/mycourses`, config);
  return response.data;
};

// Named exports (updated from default export)
export {
  getCourses,
  getCourse,
  createCourse,
  enrollCourse,
  getEnrolledCourses,
  getInstructorCourses
};