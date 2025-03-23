import { takeEvery, call, put } from "redux-saga/effects";
import { executeApiCall } from "./api";
import {
  SEARCH_POST,
  FETCH_POST_BY_ID,
  UPDATE_POST_STATUS,
  SAVE_POST,
  DELETE_POST
} from "../actionTypes/post";
import {
  setSearchPostLoading,
  searchPostSuccess,
  searchPostFailed,
  setPost,
  updatePostStatusSuccess,
  updatePostStatusFailed,
  savePostSuccess,
  savePostFailed,
  deletePostSuccess,
  deletePostFailed
} from "../actionCreators/post";
import { offerCourseApi } from "../endpoints"; // Using offerCourseApi as it points to /posts endpoint

export default function* postSaga() {
  yield takeEvery(SEARCH_POST, searchPosts);
  yield takeEvery(FETCH_POST_BY_ID, fetchPostById);
  yield takeEvery(UPDATE_POST_STATUS, updatePostStatus);
  yield takeEvery(SAVE_POST, savePost);
  yield takeEvery(DELETE_POST, deletePost);
}

export function* searchPosts(action) {
  try {
    yield put(setSearchPostLoading());
    
    const { filters } = action.payload;
    
    // Prepare query params
    const queryParams = {};
    if (filters) {
      Object.keys(filters).forEach(key => {
        queryParams[key] = filters[key];
      });
    }
    
    const apiOptions = {
      url: offerCourseApi,
      method: "GET",
      params: queryParams,
      useJwtSecret: false,
    };

    const apiResponse = yield call(executeApiCall, apiOptions);
    console.log('from saga', apiResponse);
    const { isSuccessful, response = {} } = apiResponse;
    console.log('from saga response', response);
    
    if (isSuccessful) {
      console.log('Success response structure:', response);
      
      // Check if response already has data property or if the response itself is the data array
      const formattedResponse = Array.isArray(response) 
        ? { data: response } // If response is an array, wrap it in a data property
        : (response.data ? response : { data: response }); // Otherwise ensure we have a data property
      
      console.log('Formatted response for reducer:', formattedResponse);
      yield put(searchPostSuccess(formattedResponse));
    } else {
      yield put(searchPostFailed(response));
    }
  } catch (error) {
    yield put(searchPostFailed({ error: error.message }));
  }
}

export function* fetchPostById(action) {
  try {
    const { id } = action.payload;
    
    const apiOptions = {
      url: `${offerCourseApi}/${id}`,
      method: "GET",
      useJwtSecret: false,
    };

    const apiResponse = yield call(executeApiCall, apiOptions);
    const { isSuccessful, response = {} } = apiResponse;
    console.log('fetchPostById response:', response);

    if (isSuccessful) {
      // Handle various response structures
      const postData = response.data || response;
      yield put(setPost(postData));
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

export function* updatePostStatus(action) {
  try {
    const { postId, status } = action.payload;
    console.log('updatePostStatus called with:', { postId, status });
    
    // Ensure status is a string
    const statusStr = String(status);
    
    // IMPORTANT FIX: The backend route is a PUT to the base URL, not the ID URL
    // We need to include the id in the body instead
    const apiOptions = {
      url: offerCourseApi, // Base URL without ID
      method: "PUT",
      body: { 
        id: postId,
        status: statusStr 
      },
      useJwtSecret: false,
    };
    
    console.log('Making API call with options:', JSON.stringify(apiOptions, null, 2));

    const apiResponse = yield call(executeApiCall, apiOptions);
    const { isSuccessful, response = {}, statusCode } = apiResponse;
    console.log('updatePostStatus response:', response);
    console.log('updatePostStatus API status code:', statusCode);
    console.log('updatePostStatus success:', isSuccessful);

    if (isSuccessful) {
      yield put(updatePostStatusSuccess({ 
        message: response.message || "Post status updated successfully" 
      }));
    } else {
      console.error('Failed to update post status:', response);
      yield put(updatePostStatusFailed({ 
        error: response.error || "Failed to update post status" 
      }));
    }
  } catch (error) {
    console.error('Error in updatePostStatus saga:', error);
    yield put(updatePostStatusFailed({ error: error.message }));
  }
}

export function* savePost(action) {
  try {
    const postData = action.payload;
    
    const apiOptions = {
      url: offerCourseApi,
      method: "POST",
      body: postData,
      useJwtSecret: false,
    };

    const apiResponse = yield call(executeApiCall, apiOptions);
    const { isSuccessful, response = {} } = apiResponse;
    console.log('savePost response:', response);

    if (isSuccessful) {
      yield put(savePostSuccess(response));
    } else {
      yield put(savePostFailed({ 
        error: response.error || "Failed to save post" 
      }));
    }
  } catch (error) {
    yield put(savePostFailed({ error: error.message }));
  }
}

export function* deletePost(action) {
  try {
    const { id } = action.payload;
    
    const apiOptions = {
      url: `${offerCourseApi}/${id}`,
      method: "DELETE",
      useJwtSecret: false,
    };

    const apiResponse = yield call(executeApiCall, apiOptions);
    const { isSuccessful, response = {} } = apiResponse;
    console.log('deletePost response:', response);

    if (isSuccessful) {
      yield put(deletePostSuccess({ 
        message: response.message || "Post deleted successfully" 
      }));
    } else {
      yield put(deletePostFailed({ 
        error: response.error || "Failed to delete post" 
      }));
    }
  } catch (error) {
    yield put(deletePostFailed({ error: error.message }));
  }
} 