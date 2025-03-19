import React from "react";
import { useSelector } from "react-redux";
import Page from "../../components/page/Page";
import Admin from "./admin/index";
import Student from "./student/index";
import TutorProfile from "../tutorProfile/TutorProfile";
import { getUserType, getCurrentUser } from "../../core/selectors/user";

// 1. dispatch -> actionCreator (getTutorList) -> reducer (GET_TUTOR_LIST)    -> saga (GET_TUTOR_LIST)
// 2. reducer (GET_TUTOR_LIST_SUCCESS) <- actionCreator (getTutorListSuccess)  <- saga (getTutorListSuccess)

function Home() {
  /*
  const search = useLocation().search;
  const userType = new URLSearchParams(search).get('userType');
  */

  let userType = useSelector(getUserType);
  let currentUser = useSelector(getCurrentUser);
  console.log(userType);

  function renderHome() {
    switch (userType) {
      case "admin":
        return (
          <Page>
            <Admin />
          </Page>
        );
      case "tutor":
        return <TutorProfile tutorId={currentUser.id} />;
      case "student":
      case "guest":
        return (
          <Page>
            <Student />
          </Page>
        );
      default:
        return <Page />;
    }
  }

  return renderHome();
}

export default Home;
