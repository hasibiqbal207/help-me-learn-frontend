import { UPLOAD_FILE } from "../actionTypes/fileUpload";

export const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
    if(action.type === UPLOAD_FILE) {
      return {
        ...state,
      };
    } else {
      return state;
    }
};
