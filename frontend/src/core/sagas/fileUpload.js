// @flow
import { takeEvery, call } from "redux-saga/effects";
import { executeApiCall } from "./api";
import { UPLOAD_FILE } from "../actionTypes/fileUpload";
import { fileUploadApi } from "../endpoints";

export default function* fileUploadSaga() {
  yield takeEvery(UPLOAD_FILE, uploadFile);
}

export function* uploadFile(action){
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const formData = new FormData();
  formData.append("file", action.payload.file);

  console.log("from file upload saga", action.payload.file);
  const apiOptions = {
    url: fileUploadApi,
    method: "POST",
    params: formData,
    headers: headers,
    useJwtSecret: true,
  };

  const apiResponse = yield call(executeApiCall, apiOptions);

  const { isSuccessful } = apiResponse;
  console.log(apiResponse)
  let msg = "";
  if (isSuccessful) {
    msg = "Course Saved Successfully";
    // yield put(saveCourseSuccess({ msg }));
  } else {
    msg = "Failed to save data"; //FIXME Improve error message
    // yield put(saveCourseFailed({ msg }));
  }
}

