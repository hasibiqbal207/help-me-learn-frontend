import { UPLOAD_FILE } from "../actionTypes/fileUpload";

//POST
export const uploadFile = (file) => {
  console.log("from file upload creators: " + file.name);
  
  // Instead of storing the file object in Redux, just pass a reference
  // The actual file will be handled directly in the saga
  return {
    type: UPLOAD_FILE,
    payload: {
      fileId: file.lastModified + '-' + file.name,
      fileName: file.name,
      // Don't include the file object in the action
      // Use a meta field instead
      meta: { file }
    },
  };
};