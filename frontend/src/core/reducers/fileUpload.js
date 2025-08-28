import { UPLOAD_FILE } from "../actionTypes/fileUpload";

export const INITIAL_STATE = {
  data: [],
  currentUpload: null,
  uploading: false
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === UPLOAD_FILE) {
    const { meta, ...safePayload } = action.payload;
    // Store only serializable information, not the File object
    return {
      ...state,
      currentUpload: {
        fileId: safePayload.fileId,
        fileName: safePayload.fileName,
        uploading: true
      }
    };
  } else {
    return state;
  }
};
