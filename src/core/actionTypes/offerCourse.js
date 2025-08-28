export const prefix = "@offerCourse";

//POST
export const SAVE_OFFER_COURSE = `${prefix}/SAVE_OFFER_COURSE`;
export const SAVE_OFFER_COURSE_LOADING = `${prefix}/SAVE_OFFER_COURSE_LOADING`;
export const SAVE_OFFER_COURSE_SUCCESS = `${prefix}/SAVE_OFFER_COURSE_SUCCESS`;
export const SAVE_OFFER_COURSE_FAILED = `${prefix}/SAVE_OFFER_COURSE_FAILED`;

//GET
export const FETCH_OFFER_COURSE_LIST = `${prefix}/FETCH_OFFER_COURSE_LIST`;
export const SET_OFFER_COURSE_LIST = `${prefix}/SET_OFFER_COURSE_LIST`;

// Course offering status update action types (for approval/rejection)
export const UPDATE_OFFER_COURSE_STATUS = `${prefix}/UPDATE_OFFER_COURSE_STATUS`;
export const UPDATE_OFFER_COURSE_STATUS_SUCCESS = `${prefix}/UPDATE_OFFER_COURSE_STATUS_SUCCESS`;
export const UPDATE_OFFER_COURSE_STATUS_FAILED = `${prefix}/UPDATE_OFFER_COURSE_STATUS_FAILED`;