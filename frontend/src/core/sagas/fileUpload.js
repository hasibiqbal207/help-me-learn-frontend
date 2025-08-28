// @flow
import { takeEvery, call, select, put } from "redux-saga/effects";
import { executeApiCall } from "./api";
import { UPLOAD_FILE } from "../actionTypes/fileUpload";
import { fileUploadApi } from "../endpoints";
import { getCurrentUser } from "../selectors/user";
import { fetchTutorFiles } from "../actionCreators/tutor";

export default function* fileUploadSaga() {
  yield takeEvery(UPLOAD_FILE, uploadFile);
}

export function* uploadFile(action) {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const currentUser = yield select(getCurrentUser);
    
    if (!currentUser || !currentUser.id) {
      console.error("Cannot upload file: User is not authenticated");
      // We might want to show a login prompt or message to the user here
      return;
    }

    // Check if the user is a tutor
    if (currentUser.userType !== 101) { // 101 is the tutor user type
      console.error("File upload failed: User is not a tutor");
      return;
    }

    console.log("Uploading file for user ID:", currentUser.id);
    
    // Get the file from the meta field, not directly from the payload
    const file = action.payload.meta?.file;
    
    if (!file) {
      console.error("No file provided for upload");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", currentUser.id);
    
    console.log("Uploading file:", action.payload.fileName);
    
    // For file uploads we need authorization, but let's make it optional
    // to prevent breaking if the user isn't fully authenticated
    const apiOptions = {
      url: fileUploadApi,
      method: "POST",
      data: formData,
      headers: headers,
      useJwtSecret: true,
    };

    const apiResponse = yield call(executeApiCall, apiOptions);

    const { isSuccessful, response } = apiResponse;
    console.log("API Response:", apiResponse);
    
    let msg = "";
    if (isSuccessful) {
      msg = "File Uploaded Successfully";
      console.log(msg, response);
      
      // Refresh the file list after successful upload
      yield put(fetchTutorFiles(currentUser.id));
    } else {
      msg = "Failed to upload file"; 
      console.error(msg, apiResponse);
    }
  } catch (error) {
    console.error("Error in file upload saga:", error);
  }
}

