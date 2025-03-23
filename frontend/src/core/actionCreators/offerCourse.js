// @flow
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
  
  export const saveOfferCourse = (offerCourse) => {
    return {
      type: SAVE_OFFER_COURSE,
      payload: offerCourse,
    };
  };
  
  export const saveOfferCourseLoading = () => {
    return {
      type: SAVE_OFFER_COURSE_LOADING,
    };
  };
  
  export const saveOfferCourseSuccess = (data) => {
    return {
      type: SAVE_OFFER_COURSE_SUCCESS,
      data,
    };
  };
  
  export const saveOfferCourseFailed = (data) => {
    return {
      type: SAVE_OFFER_COURSE_FAILED,
      data,
    };
  };
  
  // Update course offering status (for approval/rejection)
  export const updateOfferCourseStatus = (courseId, status) => {
    return {
      type: UPDATE_OFFER_COURSE_STATUS,
      payload: {
        id: courseId,
        status
      },
    };
  };
  
  export const updateOfferCourseStatusSuccess = (message) => {
    return {
      type: UPDATE_OFFER_COURSE_STATUS_SUCCESS,
      payload: {
        message
      },
    };
  };
  
  export const updateOfferCourseStatusFailed = (error) => {
    return {
      type: UPDATE_OFFER_COURSE_STATUS_FAILED,
      payload: {
        error
      },
    };
  };
  