import { takeEvery, call, put } from "redux-saga/effects";
import { executeApiCall } from "./api";
import {
  SAVE_COURSE,
  FETCH_APPROVED_COURSE_LIST,
  FETCH_COURSE_LIST_BY_STATUS,
} from "../actionTypes/course";
import {
  setApprovedCourseList,
  saveCourseSuccess,
  saveCourseFailed,
  getCourseListByStatusSuccess,
  getCourseListByStatusFailed,
} from "../actionCreators/course";
import { courseApi } from "../endpoints";

export default function* courseSaga() {
  yield takeEvery(SAVE_COURSE, saveCourse);
  yield takeEvery(FETCH_APPROVED_COURSE_LIST, fetchApprovedCourseList);
  yield takeEvery(FETCH_COURSE_LIST_BY_STATUS, getCourseListByStatus);
}

export function* saveCourse(action) {
  // const { course } = action.payload;
  console.log("hello");

  let url = process.env.REACT_APP_API_URL;
  url += `/course`;

  const apiOptions = {
    url,
    method: "POST",
    params: action.payload,
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { success } = apiResponse;
  let msg = "";
  if (success) {
    msg = "Course Saved Successfully";
    yield put(saveCourseSuccess({ msg }));
  } else {
    msg = "Failed to save data"; //FIXME Improve error message
    yield put(saveCourseFailed({ msg }));
  }
}

export function* getCourseListByStatus(action) {
  const { status } = action.payload;

  let url = `${process.env.REACT_APP_API_URL}`;
  console.log(status);
  if (status) {
    url += `/course/status=${status}`;
  }

  const apiOptions = {
    url,
    method: "GET",
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { success, response = {} } = apiResponse;

  if (success) {
    let data = response;
    yield put(getCourseListByStatusSuccess({ data }));
  } else {
    let msg = "Failed to load data from API"; //FIXME Improve error message
    yield put(getCourseListByStatusFailed({ msg }));
  }
}

export function* fetchApprovedCourseList(action) {
  const apiOptions = {
    url: courseApi,
    method: "GET",
    params: { Status: 101 },
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { isSuccessful, response = {} } = apiResponse;

  if (isSuccessful) {
    yield put(setApprovedCourseList(response));
  }
}
