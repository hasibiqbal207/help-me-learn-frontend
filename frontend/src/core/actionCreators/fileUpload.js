import { UPLOAD_FILE } from "../actionTypes/fileUpload";

//POST
export const uploadFile = (data) => {
   console.log("from file upload creators" + data.name);
  return {
    type: UPLOAD_FILE,
    payload: {
    file: data,
  },
  };
};