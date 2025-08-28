import {
  SAVE_OFFER_COURSE,
  SAVE_OFFER_COURSE_LOADING,
  SAVE_OFFER_COURSE_SUCCESS,
  SAVE_OFFER_COURSE_FAILED,
  FETCH_OFFER_COURSE_LIST,
  SET_OFFER_COURSE_LIST,
  UPDATE_OFFER_COURSE_STATUS,
  UPDATE_OFFER_COURSE_STATUS_SUCCESS,
  UPDATE_OFFER_COURSE_STATUS_FAILED
} from "../actionTypes/offerCourse";

export const INITIAL_STATE = {
  data: [],
  filters: {
    subjectName: undefined,
    level: undefined,
    minRate: 0,
    gender: undefined,
  },
  saveAlert: undefined,
  statusUpdateMessage: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_OFFER_COURSE_LIST: {
      const { filters } = action.payload;
      return {
        ...state,
        filters: filters,
      };
    }
    case SET_OFFER_COURSE_LIST:
      return {
        ...state,
        data: action.payload,
      };
    case SAVE_OFFER_COURSE:
      return {
        ...state,
        saveAlert: undefined,
      };
    case SAVE_OFFER_COURSE_LOADING:
      return {
        ...state,
        saveAlert: undefined,
      };
    case SAVE_OFFER_COURSE_SUCCESS:
      return {
        ...state,
        saveAlert: {
          type: "success",
          message: action.data.msg || "Course offering submitted for approval!",
        },
      };
    case SAVE_OFFER_COURSE_FAILED:
      return {
        ...state,
        saveAlert: {
          type: "danger",
          message: action.data?.msg || "Failed to submit course offering. Please try again.",
        },
      };
      
    // Handle tutor course offering status update actions
    case UPDATE_OFFER_COURSE_STATUS:
      return {
        ...state,
        statusUpdateMessage: null,
        error: null
      };
    case UPDATE_OFFER_COURSE_STATUS_SUCCESS:
      return {
        ...state,
        statusUpdateMessage: action.payload.message,
        error: null
      };
    case UPDATE_OFFER_COURSE_STATUS_FAILED:
      return {
        ...state,
        statusUpdateMessage: null,
        error: action.payload.error
      };
      
    default:
      return state;
  }
};
