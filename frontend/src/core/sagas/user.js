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
  const { email, pd } = action.payload;

  const apiOptions = {
    url: loginApi,
    method: "POST",
    params: {
      email: email,
      password: pd,
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
      const { id, email, user_type, status, exp } = decoded;
      yield put(setCurrentUser({ id, email, user_type, status, exp, token }));
    }
  } else {
    const errorMessage = response.message || response.ErrorMessage;
    yield put(setLoginAlert(errorMessage));
  }
}

export function* register(action){
  const apiOptions = {
    url: registerApi,
    method: "POST",
    params: action.payload.data,
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
