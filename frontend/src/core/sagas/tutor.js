import { takeEvery, call, put } from "redux-saga/effects";
import { executeApiCall } from "./api";
import {
  FETCH_TUTOR_LIST,
  GET_TUTOR_INFO_BY_ID,
  GET_TUTOR_OFFERED_COURSE_BY_ID,
  GET_TUTOR_QUALIFICATION_BY_ID,
  GET_TUTOR_REVIEW_BY_ID,
  SAVE_REVIEW,
  FETCH_TUTOR_FILES,
} from "../actionTypes/tutor";
import {
  allTutorListApi,
  getTutorInfoById,
  getTutorOfferedCoursesById,
  getTutorQualificationById,
  getTutorReviewsById,
  reviewApi,
  fetchApi,
} from "../endpoints";
import {
  getTutorListFailed,
  getTutorListSuccess,
  setTutorInfo,
  setTutorOfferedCourse,
  setTutorQualification,
  setTutorReview,
  saveReviewSuccess,
  saveReviewFailed,
  setTutorFiles,
} from "../actionCreators/tutor";

export default function* tutorSaga() {
  yield takeEvery(FETCH_TUTOR_LIST, getTutorList);
  yield takeEvery(GET_TUTOR_INFO_BY_ID, getTutorInfoDataById);
  yield takeEvery(
    GET_TUTOR_OFFERED_COURSE_BY_ID,
    getTutorOfferedCourseDataById
  );
  yield takeEvery(GET_TUTOR_QUALIFICATION_BY_ID, getTutorQualificationDataById);
  yield takeEvery(GET_TUTOR_REVIEW_BY_ID, getTutorReviewDataById);
  yield takeEvery(SAVE_REVIEW, saveReview);
  yield takeEvery(FETCH_TUTOR_FILES, fetchTutorFiles);
}

export function* fetchTutorFiles(action) {
  const apiOptions = {
    url: `${fetchApi}/${action.payload}`,
    method: "GET",
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { isSuccessful, response = {} } = apiResponse;
  if (isSuccessful) {
    yield put(setTutorFiles(response.data));
  }
}

export function* getTutorList(action) {
  const { filters } = action.payload;

  let url = allTutorListApi;

  if (filters.fName) {
    url += `&FirstName=${filters.fName}`;
  }
  if (filters.lName) {
    url += `&LastName=${filters.lName}`;
  }
  if (filters.email) {
    url += `&Email=${filters.email}`;
  }

  const apiOptions = {
    url: url,
    method: "GET",
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { isSuccessful, response = {} } = apiResponse;

  if (isSuccessful) {
    let data = response;
    yield put(getTutorListSuccess({ data }));
  } else {
    let msg = "Failed to load data from API"; //FIXME Improve error message
    yield put(getTutorListFailed({ msg }));
  }
}

export function* getTutorInfoDataById(action) {
  const { id } = action.payload;
  const apiOptions = {
    url: getTutorInfoById(id),
    method: "GET",
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);
  const { isSuccessful, response = {} } = apiResponse;
  if (isSuccessful) {
    yield put(setTutorInfo(response));
  }
}

export function* getTutorOfferedCourseDataById(action) {
  const { id } = action.payload;
  const apiOptions = {
    url: getTutorOfferedCoursesById(id),
    method: "GET",
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);
  const { isSuccessful, response = {} } = apiResponse;
  if (isSuccessful) {
    yield put(setTutorOfferedCourse(response));
  }
}

export function* getTutorQualificationDataById(action) {
  const { id } = action.payload;
  const apiOptions = {
    url: getTutorQualificationById(id),
    method: "GET",
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);
  const { isSuccessful, response = {} } = apiResponse;
  if (isSuccessful) {
    yield put(setTutorQualification(response));
  }
}

export function* getTutorReviewDataById(action) {
  const { id } = action.payload;
  const apiOptions = {
    url: getTutorReviewsById(id),
    method: "GET",
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);
  const { isSuccessful, response = {} } = apiResponse;
  if (isSuccessful) {
    yield put(setTutorReview(response));
  }
}

export function* saveReview(action) {
  // const { course } = action.payload;
  console.log(action.payload);

  // var url = process.env.REACT_APP_API_URL;
  // url += `/reviews`;

  const apiOptions = {
    url: reviewApi,
    method: "POST",
    params: action.payload,
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { success } = apiResponse;
  let msg = "";
  if (success) {
    msg = "Review Saved Successfully";
    yield put(saveReviewSuccess({ msg }));
  } else {
    msg = "Failed to save data"; //FIXME Improve error message
    yield put(saveReviewFailed({ msg }));
  }
}
