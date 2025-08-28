import { call, race, delay, select, put } from "redux-saga/effects";

import axios from "axios";
import { logoutUser, setLoginAlert } from "../actionCreators/user";
import isOnline from "is-online";
import { getCurrentUser } from "../selectors/user";

const DEFAULT_TIMEOUT = 1000000;

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: undefined,
};

export const DEFAULT_API_OPTIONS = {
  url: "",
  method: "POST",
  headers: DEFAULT_HEADERS,
  timeout: DEFAULT_TIMEOUT,
  useJwtSecret: false,
};

// Function to get JWT token from Redux store
function* retrieveJwtSecret() {
  try {
    const currentUser = yield select(getCurrentUser);
    if (currentUser && currentUser.token) {
      console.log("Retrieved JWT token for authenticated user");
      return currentUser.token;
    }
    console.warn("No JWT token found in user state");
    return null;
  } catch (error) {
    console.error("Error retrieving JWT token:", error);
    return null;
  }
}

export function* executeApiCall(options) {
  
  // Merge options with defaults
  const apiOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
    headers: { ...DEFAULT_HEADERS, ...options.headers },
    body: JSON.stringify(options.body),
  };

  const { url, method, params, data, headers, timeout, useJwtSecret, body } = apiOptions;
  console.log("API call - Starting API call to:", url, "with method:", method);
  console.log("API call - Request body:", body);
  initializeApiResponse(apiOptions);

  // Check network connectivity
  const isConnected = yield call(isOnline);
  if (!isConnected) {
    console.error("API call - Network error: Not connected to the internet");
    return handleNetworkError(apiOptions);
  }

  // Handle JWT authorization if required
  if (useJwtSecret && !(yield authorizeRequest(headers))) {
    console.error("API call - Authorization error: Failed to authorize request");
    return handleAuthError(apiOptions);
  }

  // Set up axios request configuration
  const requestCancellation = axios.CancelToken.source();
  const axiosOpts = configureAxiosRequest({
    url, method, timeout, headers, params, data, body: apiOptions.body, cancelToken: requestCancellation.token,
  });
  console.log("API call - Full Axios config:", JSON.stringify(axiosOpts, null, 2));

  // Execute the API call
  try {
    console.log("API call - Executing actual API call");
    const { response, timeout } = yield call(executeActualApiCall, axiosOpts);

    if (timeout) {
      console.error("API call - Request timed out");
      requestCancellation.cancel("Request timeout.");
      return handleTimeoutError(apiOptions);
    }
    
    // Successful API call
    console.log("API call - Successfully received response with status:", response?.status);
    return buildSuccessfulResponse(apiOptions, response);

  } catch (error) {
    console.error("API call - Error during API call:", error.message);
    return handleApiError(apiOptions, error);
  }
}

export function* executeActualApiCall(
  axiosOpts
){
  return yield race({
    response: call(axios, axiosOpts),
    timeout: delay(axiosOpts.timeout),
  });
}

// Helper Functions

function initializeApiResponse(apiOptions) {
  return {
    isSuccessful: false,
    errorCode: "UNKNOWN_ERROR",
    apiOptions,
  };
}

function handleNetworkError(apiOptions) {
  return {
    ...initializeApiResponse(apiOptions),
    errorCode: "NETWORK_UNAVAILABLE",
    response: { ErrorMessage: "Check your internet connection and try again." },
  };
}

function* authorizeRequest(headers) {
  try {
    const jwtSecret = yield call(retrieveJwtSecret);
    if (jwtSecret) {
      console.log("Setting Authorization header with JWT token");
      headers.Authorization = `Bearer ${jwtSecret}`;
      return true;
    }
    
    console.warn("JWT authorization failed - no token available");
    // Only redirect to login if we're attempting to access a protected resource
    // and the user has previously been authenticated
    const currentUser = yield select(getCurrentUser);
    if (currentUser) {
      console.log("User session expired, redirecting to login");
      yield put(setLoginAlert("Session expired. Please sign in again."));
      yield put(logoutUser());
    } else {
      console.log("User not authenticated yet, skipping login redirect");
    }
    
    return false;
  } catch (error) {
    console.error("Error during JWT authorization:", error);
    return false;
  }
}

function handleAuthError(apiOptions) {
  return {
    ...initializeApiResponse(apiOptions),
    errorCode: "AUTHENTICATION_ERROR",
    response: { ErrorMessage: "Session expired. Please sign in again." },
  };
}

function configureAxiosRequest({ url, method, timeout, headers, params, data, body, cancelToken }) {
  // Handle FormData objects specially for multipart uploads
  if (data instanceof FormData) {
    return {
      url,
      method,
      timeout,
      headers,
      cancelToken,
      data
    };
  }
  
  if (params instanceof FormData) {
    return {
      url,
      method,
      timeout,
      headers,
      cancelToken,
      data: params // Use params directly as data when it's FormData
    };
  }
  
  // Handle regular requests
  return {
    url,
    method,
    timeout,
    headers,
    cancelToken,
    ...(method === "GET" ? { params } : { data: body || params || data }),
  };
}

function handleTimeoutError(apiOptions) {
  return {
    ...initializeApiResponse(apiOptions),
    errorCode: "REQUEST_TIMEOUT",
    response: { ErrorMessage: "Server took too long to respond. Please try again." },
  };
}

function buildSuccessfulResponse(apiOptions, response) {
  return {
    isSuccessful: true,
    statusCode: response.status,
    response: response.data,
    responseHeaders: response.headers,
    apiOptions,
  };
}

function handleApiError(apiOptions, error) {
  const { response, request } = error;
  console.log(error);

  if (response) {
    const { status, data, headers } = response;
    return {
      isSuccessful: false,
      statusCode: status,
      response: data,
      responseHeaders: headers,
      errorCode: status === 401 ? "AUTHENTICATION_ERROR" : "HTTP_ERROR_CODE",
      apiOptions,
      errorMessage: data?.ErrorMessage || "An unexpected error occurred."
    };
  } else if (request) {
    return {
      ...initializeApiResponse(apiOptions),
      errorCode: "NO_RESPONSE_FROM_SERVER",
      response: { ErrorMessage: "Server did not respond. Please try again." },
    };
  }

  return {
    ...initializeApiResponse(apiOptions),
    errorCode: "EXCEPTION",
    response: { ErrorMessage: "An unknown error occurred." },
  };
}
