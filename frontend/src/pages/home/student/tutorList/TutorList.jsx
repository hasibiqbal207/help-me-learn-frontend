import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import TutorItem from "./TutorItem";
import { getCourseSearchResult } from "../../../../core/selectors/offerCourse";
import Pagination from "../../../../components/pagination/Pagination.jsx";

export default function TutorList() {
  const data = useSelector(getCourseSearchResult); //TODO: Change var to const

  const [active, toggleActive] = useState(1);
  if (data === undefined) {
    return <div></div>;
  }

  const pageSize = 5;
  const start = active * pageSize - pageSize;
  const end = start + pageSize;

  return (
    <div>
      <ListGroup>
        {data.slice(start, end).map((item, i) => {
          return <TutorItem key={i} item={item} />;
        })}
      </ListGroup>
      <br />
      <Pagination
        className="float-end"
        active={active}
        toggleActive={toggleActive}
        pageSize={pageSize}
        itemCount={data.length}
      />
    </div>
  );
}
