import {
  FETCH_TUTOR_LIST,
  SET_TUTOR_LIST_LOADING,
  GET_TUTOR_LIST_SUCCESS,
  GET_TUTOR_LIST_FAILED,
  SET_TUTOR_INFO,
  SET_TUTOR_OFFERED_COURSE,
  SET_TUTOR_QUALIFICATION,
  SET_TUTOR_REVIEW,
  // SAVE_REVIEW,
  // SAVE_REVIEW_LOADING,
  // SAVE_REVIEW_SUCCESS,
  // SAVE_REVIEW_FAILED,
  SET_TUTOR_FILES,
} from "../actionTypes/tutor";

export const INITIAL_STATE = {
  data: [],
  tutorInfoData: [],
  tutorCourseData: [],
  tutorQualificationData: [],
  tutorReviewData: [],
  tutorFilesData: [],
  filters: {
    subjectId: undefined,
    level: "%",
    minRate: 0,
    gender: "%",
  },
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case FETCH_TUTOR_LIST: {
      const { filters } = action.payload;
      return {
        ...state,
        filters: filters,
      };
    }
    case SET_TUTOR_LIST_LOADING:
      return INITIAL_STATE;
    case GET_TUTOR_LIST_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        data: data,
      };
    }
    case GET_TUTOR_LIST_FAILED:
      return INITIAL_STATE;

    case SET_TUTOR_INFO:
      return {
        ...state,
        tutorInfoData: action.payload,
      };
    case SET_TUTOR_OFFERED_COURSE:
      return {
        ...state,
        tutorCourseData: action.payload,
      };
    case SET_TUTOR_FILES:
      return {
        ...state,
        tutorFilesData: action.payload,
      };
    case SET_TUTOR_QUALIFICATION:
      return {
        ...state,
        tutorQualificationData: action.payload,
      };
    case SET_TUTOR_REVIEW:
      return {
        ...state,
        tutorReviewData: action.payload,
      };
    default:
      return state;
  }
};
