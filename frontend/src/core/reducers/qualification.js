import {
  FETCH_QUALIFICATION_BY_ID,
  SET_QUALIFICATION,
  SAVE_QUALIFICATION,
  SAVE_QUALIFICATION_SUCCESS,
  SAVE_QUALIFICATION_FAILED,
  UPDATE_QUALIFICATION,
  UPDATE_QUALIFICATION_SUCCESS,
  UPDATE_QUALIFICATION_FAILED,
} from "../actionTypes/qualification";

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case FETCH_QUALIFICATION_BY_ID: {
      const { id } = action.payload;
      return {
        ...state,
        id: id,
      };
    }
    case SET_QUALIFICATION:
      return {
        ...state,
        data: action.payload,
      };

    case SAVE_QUALIFICATION:
      return {
        ...state,
        saveAlert: undefined,
      };

    case UPDATE_QUALIFICATION:
      return {
        ...state,
        updateAlert: undefined,
      };

    case SAVE_QUALIFICATION_SUCCESS:
    case UPDATE_QUALIFICATION_SUCCESS:
    case SAVE_QUALIFICATION_FAILED:
    case UPDATE_QUALIFICATION_FAILED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
