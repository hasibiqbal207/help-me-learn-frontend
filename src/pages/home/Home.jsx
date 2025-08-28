import React from "react";
import { useSelector } from "react-redux";
import Page from "../../components/page/Page";
import Student from "./student/index";
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

  // Now all user types will see the Student page (homepage)
  // Different navigation options will be shown in the navbar based on user type
  return (
    <Page>
      <Student />
    </Page>
  );
}

export default Home;
