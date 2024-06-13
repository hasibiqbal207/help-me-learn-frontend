import {
  FETCH_DASHBOARD_DATA,
  FETCH_DASHBOARD_DATA_SUCCESSFUL,
} from "../actionTypes/dashboard";

export const fetchDashboardData = () => {
  return {
    type: FETCH_DASHBOARD_DATA,
  };
};

export const fetchDashboardDataSuccessful = (payload) => {
  return {
    type: FETCH_DASHBOARD_DATA_SUCCESSFUL,
    payload,
  };
};
