import { takeEvery, call, put } from "redux-saga/effects";
import { executeApiCall } from "./api";
import { tutorsApi } from "../endpoints";
import { UPLOAD_PROFILE_PICTURE } from "../actionTypes/profilePicture";
import { setCurrentUser } from "../actionCreators/user";

export default function* profilePictureSaga() {
  yield takeEvery(UPLOAD_PROFILE_PICTURE, uploadProfilePicture);
}

export function* uploadProfilePicture(action) {
  console.log("Starting profile picture upload process");
  console.log("Payload:", {
    userId: action.payload.UserId,
    hasFile: !!action.payload.profilePicture,
    about: action.payload.About,
    age: action.payload.Age
  });

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const formData = new FormData();
  if (action.payload.profilePicture) {
    formData.append("file", action.payload.profilePicture);
    console.log("File appended to form data", action.payload.profilePicture.name);
  }
  formData.append("userId", action.payload.UserId);
  formData.append("about", action.payload.About);
  formData.append("age", action.payload.Age);

  console.log("Form data entries:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + (pair[0] === 'file' ? pair[1].name : pair[1]));
  }

  const apiOptions = {
    url: tutorsApi,
    method: "POST",
    params: formData,
    headers: headers,
    useJwtSecret: false,
  };

  console.log("API options:", {
    url: apiOptions.url,
    method: apiOptions.method,
    headers: apiOptions.headers
  });

  try {
    console.log("Calling API...");
    const apiResponse = yield call(executeApiCall, apiOptions);
    console.log("API response received:", apiResponse);

    const { isSuccessful, response = {}, error } = apiResponse;

    if (isSuccessful) {
      console.log("Profile update successful:", response);
      
      // Get the picture path from the response if available
      const picturePath = response.picturePath || action.payload.currentUser.picPath;
      console.log("Using picture path:", picturePath);
      
      // Update the current user in the Redux store with new profile information
      // Make sure to include all required fields from the current user object
      yield put(setCurrentUser({
        id: action.payload.currentUser.id,
        email: action.payload.currentUser.email,
        userType: action.payload.currentUser.userType,
        status: action.payload.currentUser.status,
        exp: action.payload.currentUser.exp,
        token: action.payload.currentUser.token,
        // Add updated profile info
        about: action.payload.About,
        age: action.payload.Age,
        // Include any picture path from response
        picPath: picturePath
      }));
      
      if (action.payload.onSuccess) {
        action.payload.onSuccess();
      }
    } else {
      console.error("Profile update failed:", error);
      if (action.payload.onFailure) {
        action.payload.onFailure(error?.message || "Failed to update profile");
      }
    }
  } catch (err) {
    console.error("Error in profile picture saga:", err);
    if (action.payload.onFailure) {
      action.payload.onFailure(err?.message || "An error occurred while updating profile");
    }
  }
}
