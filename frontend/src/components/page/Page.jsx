import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Header from "../header/Header";
import { getUserType } from "../../core/selectors/user";

function Page(props) {
  const { children } = props;

  let userType = useSelector(getUserType);

  let headerOptions = [];

  if (userType === "admin") {
    headerOptions = [];
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
