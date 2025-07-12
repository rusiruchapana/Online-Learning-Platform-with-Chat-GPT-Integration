const initialState = {
  courses: [],
  instructorCourses: [],
  enrolledCourses: [],
  currentCourse: null,
  loading: false,
  error: null
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COURSES':
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    case 'SET_INSTRUCTOR_COURSES':
      return {
        ...state,
        instructorCourses: action.payload,
        loading: false
      };
    case 'SET_ENROLLED_COURSES':
      return {
        ...state,
        enrolledCourses: action.payload,
        loading: false
      };
    case 'SET_CURRENT_COURSE':
      return {
        ...state,
        currentCourse: action.payload,
        loading: false
      };
    case 'ADD_COURSE':
      return {
        ...state,
        instructorCourses: [...state.instructorCourses, action.payload],
        loading: false
      };
    case 'ENROLL_COURSE':
      return {
        ...state,
        enrolledCourses: [...state.enrolledCourses, action.payload],
        loading: false
      };
    case 'COURSE_LOADING':
      return {
        ...state,
        loading: true
      };
    case 'COURSE_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default courseReducer;