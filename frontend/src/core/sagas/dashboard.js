
import { takeEvery, call, put } from "redux-saga/effects";
import { executeApiCall } from "./api";
import { FETCH_DASHBOARD_DATA } from "../actionTypes/dashboard";
import { fetchDashboardDataSuccessful } from "../actionCreators/dashboard";
import { dashboardApi } from "../endpoints";

export default function* courseSaga() {
  yield takeEvery(FETCH_DASHBOARD_DATA, fetchDashboardData);
}

export function* fetchDashboardData(action) {
  const apiOptions = {
    url: dashboardApi,
    method: "GET",
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { isSuccessful, response = {} } = apiResponse;

  if (isSuccessful) {
    yield put(fetchDashboardDataSuccessful(response));
  }
}
