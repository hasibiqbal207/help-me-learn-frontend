export const prefix = "@course";

export const SAVE_COURSE = `${prefix}/SAVE_COURSE`;
export const SAVE_COURSE_LOADING = `${prefix}/SAVE_COURSE_LOADING`;
export const SAVE_COURSE_SUCCESS = `${prefix}/SAVE_COURSE_SUCCESS`;
export const SAVE_COURSE_FAILED = `${prefix}/SAVE_COURSE_FAILED`;

export const FETCH_APPROVED_COURSE_LIST = `${prefix}/FETCH_APPROVED_COURSE_LIST`;
export const SET_APPROVED_COURSE_LIST = `${prefix}/SET_APPROVED_COURSE_LIST`;

export const FETCH_COURSE_LIST_BY_STATUS = `${prefix}/FETCH_COURSE_LIST_BY_STATUS`;
export const SET_COURSE_LIST_BY_STATUS_LOADING = `${prefix}/SET_COURSE_LIST_BY_STATUS_LOADING`;
export const GET_COURSE_LIST_BY_STATUS_SUCCESS = `${prefix}/GET_COURSE_LIST_BY_STATUS_SUCCESS`;
export const GET_COURSE_LIST_BY_STATUS_FAILED = `${prefix}/GET_COURSE_LIST_BY_STATUS_FAILED`;

// Course status update action types (for approval/rejection)
export const UPDATE_COURSE_STATUS = `${prefix}/UPDATE_COURSE_STATUS`;
export const UPDATE_COURSE_STATUS_SUCCESS = `${prefix}/UPDATE_COURSE_STATUS_SUCCESS`;
export const UPDATE_COURSE_STATUS_FAILED = `${prefix}/UPDATE_COURSE_STATUS_FAILED`;
