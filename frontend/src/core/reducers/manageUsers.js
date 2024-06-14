import { FETCH_USERS_LIST, SET_USERS_LIST } from "../actionTypes/manageUsers";

export const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS_LIST:
      return {
        ...state,
        data: [],
      };
    case SET_USERS_LIST:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
