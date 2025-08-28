import React from "react";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import UserItem from "./UserItem";
import { getUsersList } from "../../../../core/selectors/manageUsers";
import Page from "../../../../components/page/Page";
import FilterBar from "./filterBar/FilterBar";

function ManageUsers(props) {
  let data = useSelector(getUsersList);

  if (data === undefined) {
    return <div></div>;
  }

  return (
    <Page>
      <FilterBar />
      <br />
      <ListGroup>
        {data?.map((item, i) => {
          return <UserItem key={item.id} item={item} />;
        })}
      </ListGroup>
      <br />
    </Page>
  );
}

export default ManageUsers;
