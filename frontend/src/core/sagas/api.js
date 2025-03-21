import { call, race, delay, select, put } from "redux-saga/effects";

import axios from "axios";
import { logoutUser, setLoginAlert } from "../actionCreators/user";
import isOnline from "is-online";

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

export function* executeApiCall(options) {
  
  // Merge options with defaults
  const apiOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
    headers: { ...DEFAULT_HEADERS, ...options.headers },
    body: JSON.stringify(options.body),
  };

  const { url, method, params, headers, timeout, useJwtSecret } = apiOptions;
  initializeApiResponse(apiOptions);

  // Check network connectivity
  const isConnected = yield call(isOnline);
  if (!isConnected) {
    return handleNetworkError(apiOptions);
  }

  // Handle JWT authorization if required
  if (useJwtSecret && !(yield authorizeRequest(headers))) {
    return handleAuthError(apiOptions);
  }

  // Set up axios request configuration
  const requestCancellation = axios.CancelToken.source();
  const axiosOpts = configureAxiosRequest({
    url, method, timeout, headers, params, body: apiOptions.body, cancelToken: requestCancellation.token,
  });

  // Execute the API call
  try {
    const { response, timeout } = yield call(executeActualApiCall, axiosOpts);

    if (timeout) {
      requestCancellation.cancel("Request timeout.");
      return handleTimeoutError(apiOptions);
    }
    
    // Successful API call
    return buildSuccessfulResponse(apiOptions, response);

  } catch (error) {
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
  const jwtSecret = yield call(retrieveJwtSecret);
  if (jwtSecret) {
    headers.Authorization = `Bearer ${jwtSecret}`;
    return true;
  }

  yield put(setLoginAlert("Session expired. Please sign in again."));
  yield put(logoutUser());
  return false;
}

function handleAuthError(apiOptions) {
  return {
    ...initializeApiResponse(apiOptions),
    errorCode: "AUTHENTICATION_ERROR",
    response: { ErrorMessage: "Session expired. Please sign in again." },
  };
}

function configureAxiosRequest({ url, method, timeout, headers, params, body, cancelToken }) {
  // Handle FormData objects specially for multipart uploads
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
    ...(method === "GET" ? { params } : { data: body || params }),
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
