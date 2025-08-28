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
  console.log("Login saga - Starting login process for email:", email);

  const apiOptions = {
    url: loginApi,
    method: "POST",
    body: {
      email: email,
      password: password,
    },
    useJwtSecret: false,
  };

  console.log("Login saga - Calling API with options:", loginApi);
  const apiResponse = yield call(executeApiCall, apiOptions);
  console.log("Login saga - API response:", apiResponse);

  const { isSuccessful, response = {} } = apiResponse;

  if (
    isSuccessful &&
    (response.message == undefined || response.message == "")
  ) {
    console.log("Login saga - Login successful, processing token");
    const { id, email, token } = response;
    if (token !== undefined) {
      let decoded = jwt_decode(token);
      console.log("Login saga - Decoded token:", decoded);
      const { id, email, userType, status, exp } = decoded;
      yield put(setCurrentUser({ id, email, userType, status, exp, token }));
      console.log("Login saga - User set in state");
    } else {
      console.error("Login saga - Token is undefined in successful response");
      yield put(setLoginAlert("Authentication failed: Invalid token"));
    }
  } else {
    const errorMessage = response.message || response.ErrorMessage || "Unknown error occurred";
    console.error("Login saga - Login failed:", errorMessage);
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

  console.log("Sending registration request with options:", apiOptions);
  const apiResponse = yield call(executeApiCall, apiOptions);
  console.log("Registration API response:", apiResponse);

  const { isSuccessful, response = {} } = apiResponse;

  if (isSuccessful) {
    const { message } = response;
    console.log("Registration successful:", message);
    action.payload.navigate("/login");
    yield put(setLoginAlert(message, "success"));
  } else {
    const errorMessage = response.ErrorMessage || response.message;
    console.error("Registration failed:", errorMessage);
    yield put(setRegistrationAlert(errorMessage));
  }
}

