// @flow
import {
    SAVE_OFFER_COURSE,
    SAVE_OFFER_COURSE_LOADING,
    SAVE_OFFER_COURSE_SUCCESS,
    SAVE_OFFER_COURSE_FAILED,
    FETCH_OFFER_COURSE_LIST,
    SET_OFFER_COURSE_LIST,
  } from "../actionTypes/offerCourse";
  
  export const fetchOfferCourse = (payload) => {
    const { filters = {} } = payload;
    return {
      type: FETCH_OFFER_COURSE_LIST,
      payload: {
        filters,
      },
    };
  };
  
  export const setOfferCourse = (payload) => {
    return {
      type: SET_OFFER_COURSE_LIST,
      payload,
    };
  };
  
  export const saveOfferCourse = (data) => {
    console.log(`from creators ${data}`);
    return {
      type: SAVE_OFFER_COURSE,
      payload: data,
    };
  };
  
  export const saveOfferCourseLoading = (data) => ({
    type: SAVE_OFFER_COURSE_LOADING,
    data,
  });
  
  export const saveOfferCourseSuccess = (data) => ({
    type: SAVE_OFFER_COURSE_SUCCESS,
    data,
  });
  
  export const saveOfferCourseFailed = (data) => ({
    type: SAVE_OFFER_COURSE_FAILED,
    data,
  });
  