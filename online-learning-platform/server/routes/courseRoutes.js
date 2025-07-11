const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getEnrolledCourses,
  getInstructorCourses,
} = require('../controllers/courseController');
const { protect, instructor, student } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.get('/instructor/mycourses', protect, instructor, getInstructorCourses);
router.get('/student/enrolled', protect, student, getEnrolledCourses);

router.post('/', protect, instructor, createCourse);
router.put('/:id', protect, instructor, updateCourse);
router.delete('/:id', protect, instructor, deleteCourse);
router.post('/:id/enroll', protect, student, enrollCourse);

module.exports = router;