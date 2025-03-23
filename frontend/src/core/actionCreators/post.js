import {
  SEARCH_POST,
  SEARCH_POST_LOADING,
  SEARCH_POST_SUCCESS,
  SEARCH_POST_FAILED,
  FETCH_POST_BY_ID,
  SET_POST,
  UPDATE_POST_STATUS,
  UPDATE_POST_STATUS_SUCCESS,
  UPDATE_POST_STATUS_FAILED,
  SAVE_POST,
  SAVE_POST_LOADING,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILED,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILED
} from "../actionTypes/post";

// Search posts
export const searchPost = (filters) => ({
  type: SEARCH_POST,
  payload: { filters }
});

export const setSearchPostLoading = () => ({
  type: SEARCH_POST_LOADING
});

export const searchPostSuccess = (response) => ({
  type: SEARCH_POST_SUCCESS,
  payload: response
});

export const searchPostFailed = (error) => ({
  type: SEARCH_POST_FAILED,
  payload: { error }
});

// Fetch post by ID
export const fetchPostById = (id) => ({
  type: FETCH_POST_BY_ID,
  payload: { id }
});

export const setPost = (post) => ({
  type: SET_POST,
  payload: post
});

// Update post status
export const updatePostStatus = (postId, status) => ({
  type: UPDATE_POST_STATUS,
  payload: { postId, status }
});

export const updatePostStatusSuccess = (response) => ({
  type: UPDATE_POST_STATUS_SUCCESS,
  payload: response
});

export const updatePostStatusFailed = (error) => ({
  type: UPDATE_POST_STATUS_FAILED,
  payload: { error }
});

// Save post
export const savePost = (postData) => ({
  type: SAVE_POST,
  payload: postData
});

export const savePostLoading = () => ({
  type: SAVE_POST_LOADING
});

export const savePostSuccess = (response) => ({
  type: SAVE_POST_SUCCESS,
  payload: response
});

export const savePostFailed = (error) => ({
  type: SAVE_POST_FAILED,
  payload: { error }
});

// Delete post
export const deletePost = (id) => ({
  type: DELETE_POST,
  payload: { id }
});

export const deletePostSuccess = (response) => ({
  type: DELETE_POST_SUCCESS,
  payload: response
});

export const deletePostFailed = (error) => ({
  type: DELETE_POST_FAILED,
  payload: { error }
}); 