import {
    FETCH_TUTORS_PROFILE_LIST,
    SET_TUTORS_PROFILE_LIST,
  } from "../actionTypes/manageTutorsProfile";
  
  export const INITIAL_STATE = {
    data: [],
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_TUTORS_PROFILE_LIST:
        return {
          ...state,
          data: [],
        };
      case SET_TUTORS_PROFILE_LIST:
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };
  