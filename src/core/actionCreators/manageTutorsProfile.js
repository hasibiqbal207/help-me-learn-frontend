import {
    FETCH_TUTORS_PROFILE_LIST,
    SET_TUTORS_PROFILE_LIST,
    UPDATE_TUTOR_PROFILE
  } from "../actionTypes/manageTutorsProfile";
  
  export const fetchTutorsProfileList = (payload) => {
    const { filters = {} } = payload;
    return {
      type: FETCH_TUTORS_PROFILE_LIST,
      payload: {
        filters,
      },
    };
  };
  
  export const setTutorsProfileList = (payload) => {
    return {
      type: SET_TUTORS_PROFILE_LIST,
      payload,
    };
  };
  
  export const updateTutorProfile = (payload) => {
    return {
      type: UPDATE_TUTOR_PROFILE,
      payload,
    };
  };
  