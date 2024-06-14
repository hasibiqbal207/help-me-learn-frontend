import { takeEvery, call, put } from "redux-saga/effects";
import { executeApiCall } from "./api";
import { tutorSearchApi, offerCourseApi } from "../endpoints";
import {
  SAVE_OFFER_COURSE,
  FETCH_OFFER_COURSE_LIST,
} from "../actionTypes/offerCourse";
import {
  saveOfferCourseSuccess,
  saveOfferCourseFailed,
  setOfferCourse,
} from "../actionCreators/offerCourse";

export default function* offerCourseSaga() {
  yield takeEvery(SAVE_OFFER_COURSE, saveOfferCourse);
  yield takeEvery(FETCH_OFFER_COURSE_LIST, fetchOfferCourse);
}

export function* saveOfferCourse(action) {
  // const { course } = action.payload;

  const apiOptions = {
    url: offerCourseApi ,
    method: "POST",
    params: action.payload,
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { success } = apiResponse;
  let msg = "";
  if (success) {
    msg = "Course Saved Successfully";
    yield put(saveOfferCourseSuccess({ msg }));
  } else {
    msg = "Failed to save data"; //FIXME Improve error message
    yield put(saveOfferCourseFailed({ msg }));
  }
}

export function* fetchOfferCourse(action) {
  const { filters } = action.payload;
  const { subjectName, level, maxRatePerHour, gender } = filters;
  const apiOptions = {
    url: tutorSearchApi,
    method: "GET",
    params: {
      SubjectName: subjectName,
      level,
      maxRatePerHour,
      gender,
    },
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);
  const { isSuccessful, response = {} } = apiResponse;
  if (isSuccessful) {
    yield put(setOfferCourse(response));
  }
}
