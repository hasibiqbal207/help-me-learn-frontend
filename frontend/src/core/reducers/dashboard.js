import {
  FETCH_DASHBOARD_DATA,
  FETCH_DASHBOARD_DATA_SUCCESSFUL,
} from "../actionTypes/dashboard";

export const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_DATA:
      return {
        ...state,
        data: [],
      };
    case FETCH_DASHBOARD_DATA_SUCCESSFUL:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
