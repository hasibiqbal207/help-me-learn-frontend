import {
  SAVE_COURSE,
  SAVE_COURSE_LOADING,
  SAVE_COURSE_SUCCESS,
  SAVE_COURSE_FAILED,
  FETCH_APPROVED_COURSE_LIST,
  SET_APPROVED_COURSE_LIST,
  FETCH_COURSE_LIST_BY_STATUS,
  SET_COURSE_LIST_BY_STATUS_LOADING,
  GET_COURSE_LIST_BY_STATUS_SUCCESS,
  GET_COURSE_LIST_BY_STATUS_FAILED,
  UPDATE_COURSE_STATUS,
  UPDATE_COURSE_STATUS_SUCCESS,
  UPDATE_COURSE_STATUS_FAILED
} from "../actionTypes/course";

export const fetchApprovedCourseList = (payload) => {
  return {
    type: FETCH_APPROVED_COURSE_LIST,
    payload,
  };
};

export const setApprovedCourseList = (payload) => {
  return {
    type: SET_APPROVED_COURSE_LIST,
    payload,
  };
};

//POST
export const saveCourse = (data) => {
  return {
    type: SAVE_COURSE,
    payload: data,
  };
};

export const saveCourseLoading = (data) => ({
  type: SAVE_COURSE_LOADING,
  data,
});

export const saveCourseSuccess = (data) => ({
  type: SAVE_COURSE_SUCCESS,
  data,
});

export const saveCourseFailed = () => ({
  type: SAVE_COURSE_FAILED,
});

//GET by status
export const fetchCourseListByStatus = (status) => {
  return {
    type: FETCH_COURSE_LIST_BY_STATUS,
    payload: {
      status,
    },
  };
};

export const setCourseListByStatusLoading = (payload) => ({
  type: SET_COURSE_LIST_BY_STATUS_LOADING,
  payload,
});

export const getCourseListByStatusSuccess = (payload) => ({
  type: GET_COURSE_LIST_BY_STATUS_SUCCESS,
  payload,
});

export const getCourseListByStatusFailed = () => ({
  type: GET_COURSE_LIST_BY_STATUS_FAILED,
});

// Update course status (for approval/rejection)
export const updateCourseStatus = (courseId, status) => {
  return {
    type: UPDATE_COURSE_STATUS,
    payload: {
      id: courseId,
      status
    },
  };
};

export const updateCourseStatusSuccess = (message) => {
  return {
    type: UPDATE_COURSE_STATUS_SUCCESS,
    payload: {
      message
    },
  };
};

export const updateCourseStatusFailed = (error) => {
  return {
    type: UPDATE_COURSE_STATUS_FAILED,
    payload: {
      error
    },
  };
};
