import { combineReducers } from "redux";
import tutor from "./tutor";
import user from "./user";
import offerCourse from "./offerCourse";
import course from "./course";
import qualification from "./qualification";
import manageUsers from "./manageUsers";
import manageTutorsProfile from "./manageTutorsProfile";
import dashboard from "./dashboard";
import post from "./post";
import fileUpload from "./fileUpload";

const rootReducer = combineReducers({
  tutor,
  user,
  course,
  offerCourse,
  qualification,
  manageUsers,
  manageTutorsProfile,
  dashboard,
  post,
  fileUpload,
});

export default rootReducer;
