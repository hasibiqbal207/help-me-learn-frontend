import { all, fork } from "redux-saga/effects";
import tutorSaga from "./tutor";
import userSaga from "./user";
import courseSaga from "./course";
import offerCourseSaga from "./offerCourse";
import qualificationSaga from "./qualification";
import profilePictureSaga from "./profilePicture";
import fileUploadSaga from "./fileUpload";
import manageUsersSaga from "./manageUsers";
import manageTutorsProfile from "./manageTutorsProfile";
import dashboard from "./dashboard";
import postSaga from "./post";

export default function* rootSaga() {
  yield all([
    fork(tutorSaga),
    fork(userSaga),
    fork(courseSaga),
    fork(qualificationSaga),
    fork(offerCourseSaga),
    fork(profilePictureSaga),
    fork(fileUploadSaga),
    fork(manageUsersSaga),
    fork(manageTutorsProfile),
    fork(dashboard),
    fork(postSaga),
  ]);
}
