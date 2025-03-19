import { takeEvery, call, put } from "redux-saga/effects";
import jwt_decode from "jwt-decode";
import { executeApiCall } from "./api";
import { loginApi, registerApi } from "../endpoints";
import { LOGIN_USER, REGISTER_USER } from "../actionTypes/user";
import {
  setCurrentUser,
  setLoginAlert,
  setRegistrationAlert,
} from "../actionCreators/user";

export default function* loginSaga() {
  yield takeEvery(LOGIN_USER, login);
  yield takeEvery(REGISTER_USER, register);
}

export function* login(action) {
  const { email, password } = action.payload;

  const apiOptions = {
    url: loginApi,
    method: "POST",
    body: {
      email: email,
      password: password,
    },
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { isSuccessful, response = {} } = apiResponse;

  if (
    isSuccessful &&
    (response.message == undefined || response.message == "")
  ) {
    const { id, email, token } = response;
    if (token !== undefined) {
      let decoded = jwt_decode(token);
      console.log(decoded);
      const { id, email, userType, status, exp } = decoded;
      yield put(setCurrentUser({ id, email, userType, status, exp, token }));
    }
  } else {
    const errorMessage = response.message || response.ErrorMessage;
    yield put(setLoginAlert(errorMessage));
  }
}

export function* register(action) {
  const { firstName, lastName, userType, email, password, gender, status } =
    action.payload.data;

  const apiOptions = {
    url: registerApi,
    method: "POST",
    body: {
      firstName: firstName,
      lastName: lastName,
      userType: userType,
      email: email,
      password: password,
      gender: gender,
      status: status,
    },
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { isSuccessful, response = {} } = apiResponse;

  if (isSuccessful) {
    const { message } = response;
    action.payload.navigate("/login");
    yield put(setLoginAlert(message, "success"));
  } else {
    const errorMessage = response.ErrorMessage || response.message;
    yield put(setRegistrationAlert(errorMessage));
  }
}

