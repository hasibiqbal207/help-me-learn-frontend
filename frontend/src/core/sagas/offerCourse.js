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
    url: offerCourseApi,
    method: "POST",
    params: action.payload,
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { isSuccessful, response = {}, errorMessage } = apiResponse;
  let msg = "";
  if (isSuccessful) {
    msg = "Course Saved Successfully";
    yield put(saveOfferCourseSuccess({ msg }));
  } else {
    msg = errorMessage || response?.ErrorMessage || "Failed to save course offering. Please try again.";
    yield put(saveOfferCourseFailed({ msg }));
    console.error("Failed to save course:", apiResponse);
  }
}

export function* fetchOfferCourse(action) {
  const { filters } = action.payload;
  console.log("fetchOfferCourse filters:", filters);
  
  // Prepare parameters in the format expected by the backend
  const params = {};
  if (filters.subjectName) params.SubjectName = filters.subjectName;
  if (filters.level && filters.level !== 'Any') params.level = filters.level;
  if (filters.maxRatePerHour) params.maxRatePerHour = filters.maxRatePerHour;
  if (filters.gender && filters.gender !== 'Any') params.gender = filters.gender;
  
  const apiOptions = {
    url: tutorSearchApi,
    method: "GET",
    params,
    useJwtSecret: false,
  };
  
  console.log("API request options:", apiOptions);

  try {
    const apiResponse = yield call(executeApiCall, apiOptions);
    console.log("API response:", apiResponse);
    
    const { isSuccessful, response = [] } = apiResponse;
    if (isSuccessful) {
      console.log("Setting offer course data from API:", response);
      yield put(setOfferCourse(response));
    } else {
      console.error("API call failed, using mock data as fallback");
      const mockData = filterMockData(filters);
      yield put(setOfferCourse(mockData));
    }
  } catch (error) {
    console.error("Error fetching tutor data:", error);
    // Fallback to mock data if API call fails
    console.log("Using mock data due to API error");
    const mockData = filterMockData(filters);
    yield put(setOfferCourse(mockData));
  }
}
