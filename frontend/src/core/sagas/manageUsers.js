import { takeEvery, call, put } from "redux-saga/effects";
import { executeApiCall } from "./api";
import { FETCH_USERS_LIST, UPDATE_USER } from "../actionTypes/manageUsers";
import { usersApi } from "../endpoints";
import { setUsersList } from "../actionCreators/manageUsers";

export default function* manageUsersSaga() {
  yield takeEvery(FETCH_USERS_LIST, fetchUsersList);
  yield takeEvery(UPDATE_USER, updateUser);
}

export function* fetchUsersList(action) {
  const { filters } = action.payload;
  const { firstName, lastName, email, userType, status } = filters;

  let params = {
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    email: email || undefined,
    userType: userType == -1 ? undefined : userType,
    status: status == -1 ? undefined : status,
  };

  const apiOptions = {
    url: usersApi,
    method: "GET",
    params: params,
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { isSuccessful, response = {} } = apiResponse;

  if (isSuccessful) {
    yield put(setUsersList(response));
  }
}

export function* updateUser(action) {
  const apiOptions = {
    url: usersApi,
    method: "PUT",
    params: action.payload,
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);
}
