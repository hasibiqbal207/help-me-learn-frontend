// @flow
import {
    FETCH_TUTORPROFILE_LIST,
    SET_TUTORPROFILE_LIST_LOADING,
    GET_TUTORPROFILE_LIST_SUCCESS,
    GET_TUTORPROFILE_LIST_FAILED
  } from "../actionTypes/tutorprofile";
  
  export const fetchTutorProfileList = (payload) => {
    const { filters = {} } = payload;
    return {
      type: FETCH_TUTORPROFILE_LIST,
      payload: {
        filters,
      },
    };
  };
  
  export const setTutorProfileListLoading = (payload) => ({
    type: SET_TUTORPROFILE_LIST_LOADING,
    payload,
  });
  
  export const getTutorProfileListSuccess = (payload) => ({
    type: GET_TUTORPROFILE_LIST_SUCCESS,
    payload,
  });
  
  export const getTutorProfileListFailed = () => ({
    type: GET_TUTORPROFILE_LIST_FAILED,
  });
