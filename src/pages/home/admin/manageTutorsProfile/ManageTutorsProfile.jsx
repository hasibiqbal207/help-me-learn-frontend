import React from "react";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import TutorProfileItem from "./TutorProfileItem";
import { getTutorsProfileList } from "../../../../core/selectors/manageTutorsProfile.js";

import FilterBar from "./filterBar/FilterBar";
import Page from "../../../../components/page/Page.jsx";

function ManageTutorsProfile(props) {
  let data = useSelector(getTutorsProfileList);

  if (data === undefined) {
    return <div></div>;
  }

  return (
    <Page>
      <FilterBar />
      <br />
      <ListGroup>
        {data?.map((item, i) => {
          return <TutorProfileItem key={i} item={item} />;
        })}
      </ListGroup>
      <br />
    </Page>
  );
}

export default ManageTutorsProfile;
