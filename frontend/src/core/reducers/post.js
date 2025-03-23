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

export const INITIAL_STATE = {
  data: [],
  selectedPost: null,
  loading: false,
  error: null,
  statusUpdateMessage: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Search posts
    case SEARCH_POST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SEARCH_POST_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SEARCH_POST_SUCCESS:
      return {
        ...state,
        data: action.payload.data || [],
        loading: false,
        error: null
      };
    case SEARCH_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    
    // Fetch post by ID
    case FETCH_POST_BY_ID:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SET_POST:
      return {
        ...state,
        selectedPost: action.payload,
        loading: false,
        error: null
      };
    
    // Update post status
    case UPDATE_POST_STATUS:
      return {
        ...state,
        loading: true,
        statusUpdateMessage: null,
        error: null
      };
    case UPDATE_POST_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        statusUpdateMessage: action.payload.message,
        error: null
      };
    case UPDATE_POST_STATUS_FAILED:
      return {
        ...state,
        loading: false,
        statusUpdateMessage: null,
        error: action.payload.error
      };
    
    // Save post
    case SAVE_POST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_POST_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case SAVE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    
    // Delete post
    case DELETE_POST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
      
    default:
      return state;
  }
}; 