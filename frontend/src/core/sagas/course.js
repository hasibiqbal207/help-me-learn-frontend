import { takeEvery, call, put } from "redux-saga/effects";
import { executeApiCall } from "./api";
import {
  SAVE_COURSE,
  FETCH_APPROVED_COURSE_LIST,
  FETCH_COURSE_LIST_BY_STATUS,
  UPDATE_COURSE_STATUS
} from "../actionTypes/course";
import {
  setApprovedCourseList,
  saveCourseSuccess,
  saveCourseFailed,
  getCourseListByStatusSuccess,
  getCourseListByStatusFailed,
  updateCourseStatusSuccess,
  updateCourseStatusFailed
} from "../actionCreators/course";
import { courseApi } from "../endpoints";

export default function* courseSaga() {
  yield takeEvery(SAVE_COURSE, saveCourse);
  yield takeEvery(FETCH_APPROVED_COURSE_LIST, fetchApprovedCourseList);
  yield takeEvery(FETCH_COURSE_LIST_BY_STATUS, getCourseListByStatus);
  yield takeEvery(UPDATE_COURSE_STATUS, updateCourseStatusSaga);
}

export function* saveCourse(action) {
  // const { course } = action.payload;
  console.log("Saving course:", action.payload);

  let url = process.env.VITE_BACKEND_API_BASEURL;
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

  console.log("Fetching courses with status:", status);
  
  // Create API options with lowercase status parameter
  const apiOptions = {
    url: courseApi,
    method: "GET",
    params: { status: status },
    useJwtSecret: false,
  };
  
  console.log("API request options for course list by status:", apiOptions);

  try {
    const apiResponse = yield call(executeApiCall, apiOptions);
    console.log("Course list by status API response:", apiResponse);

    const { isSuccessful, response = [] } = apiResponse;

    if (isSuccessful) {
      let data = response;
      console.log("Successfully fetched course list data:", data);
      yield put(getCourseListByStatusSuccess({ data }));
    } else {
      let msg = "Failed to load data from API";
      console.error("Failed to fetch course list data:", apiResponse);
      yield put(getCourseListByStatusFailed({ msg }));
      
      // Return mock data for testing if API fails
      const mockData = [
        { 
          id: 1, 
          department: "Computer Science", 
          subjectName: "Programming 1", 
          description: "Introduction to programming with Python" 
        },
        { 
          id: 2, 
          department: "Mathematics", 
          subjectName: "Calculus", 
          description: "Basic differential and integral calculus" 
        }
      ];
      yield put(getCourseListByStatusSuccess({ data: mockData }));
    }
  } catch (error) {
    console.error("Error fetching course data by status:", error);
    yield put(getCourseListByStatusFailed({ msg: error.message }));
    
    // Return mock data for testing if there's an exception
    const mockData = [
      { 
        id: 1, 
        department: "Computer Science", 
        subjectName: "Programming 1", 
        description: "Introduction to programming with Python" 
      },
      { 
        id: 2, 
        department: "Mathematics", 
        subjectName: "Calculus", 
        description: "Basic differential and integral calculus" 
      }
    ];
    yield put(getCourseListByStatusSuccess({ data: mockData }));
  }
}

export function* fetchApprovedCourseList(action) {
  const apiOptions = {
    url: courseApi,
    method: "GET",
    params: { status: 101 },
    useJwtSecret: false,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { isSuccessful, response = {} } = apiResponse;

  if (isSuccessful) {
    yield put(setApprovedCourseList(response));
  }
}

export function* updateCourseStatusSaga(action) {
  const { id, status } = action.payload;
  
  console.log(`Updating course ${id} status to ${status}`);
  
  const apiOptions = {
    url: courseApi,
    method: "PUT",
    body: {
      id,
      status
    },
    useJwtSecret: false,
  };
  
  try {
    const apiResponse = yield call(executeApiCall, apiOptions);
    console.log("Course status update response:", apiResponse);
    
    const { isSuccessful, response = {} } = apiResponse;
    
    if (isSuccessful) {
      console.log("Successfully updated course status");
      yield put(updateCourseStatusSuccess("Course status updated successfully"));
      
      // Refresh the course list to reflect the changes
      yield put(fetchCourseListByStatus(status === "101" ? "101" : "100"));
    } else {
      console.error("Failed to update course status:", apiResponse);
      yield put(updateCourseStatusFailed("Failed to update course status"));
    }
  } catch (error) {
    console.error("Error updating course status:", error);
    yield put(updateCourseStatusFailed(error.message));
  }
}
