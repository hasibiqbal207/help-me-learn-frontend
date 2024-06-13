import {
  FETCH_QUALIFICATION_BY_ID,
  SET_QUALIFICATION,
  SAVE_QUALIFICATION,
  SAVE_QUALIFICATION_LOADING,
  SAVE_QUALIFICATION_SUCCESS,
  SAVE_QUALIFICATION_FAILED,
  UPDATE_QUALIFICATION,
  UPDATE_QUALIFICATION_SUCCESS,
  UPDATE_QUALIFICATION_FAILED,
} from "../actionTypes/qualification";

//GET
export const fetchQualificationById = (id) => {
  return {
    type: FETCH_QUALIFICATION_BY_ID,
    payload: {
      id,
    },
  };
};

export const setQualification = (payload) => {
  return {
    type: SET_QUALIFICATION,
    payload,
  };
};

//SAVE
export const saveQualification = (payload) => {
  return {
    type: SAVE_QUALIFICATION,
    payload,
  };
};

export const saveQualificationLoading = (payload) => ({
  type: SAVE_QUALIFICATION_LOADING,
});

export const saveQualificationSuccess = (message, type = "success") => ({
  type: SAVE_QUALIFICATION_SUCCESS,
  payload: {
    saveAlert: {
      message,
      type,
    },
  },
});

export const saveQualificationFailed = (message, type = "danger") => ({
  type: SAVE_QUALIFICATION_FAILED,
  payload: {
    saveAlert: {
      message,
      type,
    },
  },
});

//UPDATE
export const updateQualification = (payload) => {
  return {
    type: UPDATE_QUALIFICATION,
    payload,
  };
};

export const updateQualificationSuccess = (message, type = "success") => ({
  type: UPDATE_QUALIFICATION_SUCCESS,
  payload: {
    updateAlert: {
      message,
      type,
    },
  },
});

export const updateQualificationFailed = ( message, type = "danger") => ({
  type: UPDATE_QUALIFICATION_FAILED,
  payload: {
    updateAlert: {
      message,
      type,
    },
  },
});
