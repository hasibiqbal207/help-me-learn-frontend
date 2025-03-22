import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Header from "../header/Header";
import { getUserType, getCurrentUser } from "../../core/selectors/user";

function Page(props) {
  const { children } = props;

  let userType = useSelector(getUserType);
  let currentUser = useSelector(getCurrentUser);

  let headerOptions = [];

  if (userType === "admin") {
    headerOptions = [
      {
        title: "Admin Dashboard",
        url: "/admin"
      }
    ];
  } else if (userType === "tutor") {
    headerOptions = [
      {
        title: "My Tutor Profile",
        url: `/tutor-profile/${currentUser.id}`
      }
    ];
  } else if (userType === "student") {
    headerOptions = [
      {
        title: "My Profile",
        url: `/student-profile/${currentUser.id}`
      }
    ];
  }

  return (
    <div>
      <Header headerOptions={headerOptions} />
      <br />
      <Container fluid="lg">{children}</Container>
    </div>
  );
}

export default Page;
