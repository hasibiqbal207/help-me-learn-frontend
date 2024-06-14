import {
  SAVE_OFFER_COURSE,
  SAVE_OFFER_COURSE_LOADING,
  SAVE_OFFER_COURSE_SUCCESS,
  SAVE_OFFER_COURSE_FAILED,
  FETCH_OFFER_COURSE_LIST,
  SET_OFFER_COURSE_LIST,
} from "../actionTypes/offerCourse";

export const INITIAL_STATE = {
  data: [],
  filters: {
    subjectName: undefined,
    level: undefined,
    minRate: 0,
    gender: undefined,
  },
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
      };
    case SAVE_OFFER_COURSE_LOADING:
      return INITIAL_STATE;
    case SAVE_OFFER_COURSE_SUCCESS:
      return INITIAL_STATE;
    case SAVE_OFFER_COURSE_FAILED:
      return INITIAL_STATE;
    default:
      return state;
  }
};
