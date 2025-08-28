import { UPLOAD_PROFILE_PICTURE } from "../actionTypes/profilePicture";

export const uploadProfilePicture = (payload) => ({
  type: UPLOAD_PROFILE_PICTURE,
  payload,
});
