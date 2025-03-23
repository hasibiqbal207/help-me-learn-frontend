import {
  SAVE_COURSE,
  SAVE_COURSE_LOADING,
  SAVE_COURSE_SUCCESS,
  SAVE_COURSE_FAILED,
  SET_APPROVED_COURSE_LIST,
  FETCH_COURSE_LIST_BY_STATUS,
  SET_COURSE_LIST_BY_STATUS_LOADING,
  GET_COURSE_LIST_BY_STATUS_SUCCESS,
  GET_COURSE_LIST_BY_STATUS_FAILED,
  UPDATE_COURSE_STATUS,
  UPDATE_COURSE_STATUS_SUCCESS,
  UPDATE_COURSE_STATUS_FAILED
} from "../actionTypes/course";

export const INITIAL_STATE = {
  data: [],
  status: "",
  approvedCourseList: [],
  statusUpdateMessage: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_COURSE:
      return {
        ...state,
      };
    case SET_APPROVED_COURSE_LIST:
      return {
        ...state,
        approvedCourseList: action.payload,
      };
    case SAVE_COURSE_LOADING:
      return INITIAL_STATE;
    case SAVE_COURSE_SUCCESS:
      return INITIAL_STATE;
    case SAVE_COURSE_FAILED:
    case FETCH_COURSE_LIST_BY_STATUS: {
      const { status } = action.payload;
      return {
        ...state,
        status: status,
      };
    }
    case SET_COURSE_LIST_BY_STATUS_LOADING:
      return INITIAL_STATE;
    case GET_COURSE_LIST_BY_STATUS_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        data: data,
      };
    }
    case GET_COURSE_LIST_BY_STATUS_FAILED:
      return INITIAL_STATE;
      
    // Handle course status update actions
    case UPDATE_COURSE_STATUS:
      return {
        ...state,
        statusUpdateMessage: null,
        error: null
      };
    case UPDATE_COURSE_STATUS_SUCCESS:
      return {
        ...state,
        statusUpdateMessage: action.payload.message,
        error: null
      };
    case UPDATE_COURSE_STATUS_FAILED:
      return {
        ...state,
        statusUpdateMessage: null,
        error: action.payload.error
      };
      
    default:
      return state;
  }
};
