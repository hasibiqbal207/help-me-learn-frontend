import {
    FETCH_USERS_LIST,
    SET_USERS_LIST,
    UPDATE_USER,
  } from "../actionTypes/manageUsers";
  
  export const fetchUsersList = (payload) => {
    const { filters = {} } = payload;
    return {
      type: FETCH_USERS_LIST,
      payload: {
        filters,
      },
    };
  };
  
  export const setUsersList = (payload) => {
    return {
      type: SET_USERS_LIST,
      payload,
    };
  };
  
  export const updateUser = (payload) => {
    return {
      type: UPDATE_USER,
      payload,
    };
  };
  