import { takeEvery, call } from "redux-saga/effects";
import { executeApiCall } from "./api";
import { tutorsApi } from "../endpoints";
import { UPLOAD_PROFILE_PICTURE } from "../actionTypes/profilePicture";

export default function* profilePictureSaga() {
  yield takeEvery(UPLOAD_PROFILE_PICTURE, uploadProfilePicture);
}

export function* uploadProfilePicture(action) {
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const formData = new FormData();
  formData.append("file", action.payload.profilePicture);
  formData.append("UserId", action.payload.UserId);
  formData.append("About", action.payload.About);
  formData.append("Age", action.payload.Age);

  const apiOptions = {
    url: tutorsApi,
    method: "POST",
    params: formData,
    headers: headers,
    useJwtSecret: false,
  };

  console.log(apiOptions.params);
  const apiResponse = yield call(executeApiCall, apiOptions);

  const { isSuccessful, response = {} } = apiResponse;

  console.log(response);
}
