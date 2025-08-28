import {
  LOGIN_USER,
  SET_LOGIN_ALERT,
  LOGOUT_USER,
  SET_CURRENT_USER,
  REGISTER_USER,
  SET_REGISTRATION_ALERT,
} from "../actionTypes/user";

export const INITIAL_STATE = {
  isAuthenticated: false,
};

// A reducer is a pure function that takes an action and the *previous state* of the application
// and returns the new state.
export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginAlert: undefined,
      };
    case REGISTER_USER:
      return {
        ...state,
        registrationAlert: undefined,
      };
    case SET_LOGIN_ALERT:
    case SET_REGISTRATION_ALERT:
      return {
        ...state,
        ...action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        current: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        current: undefined,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
