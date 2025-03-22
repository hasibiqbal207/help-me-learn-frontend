import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import TutorItem from "./TutorItem";
import { getCourseSearchResult } from "../../../../core/selectors/offerCourse";
import Pagination from "../../../../components/pagination/Pagination.jsx";

export default function TutorList() {
  const data = useSelector(getCourseSearchResult); 

  const [active, toggleActive] = useState(1);
  if (data === undefined) {
    console.log("Data is undefined, returning empty div");
    return <div></div>;
  }

  const pageSize = 5;
  const start = active * pageSize - pageSize;
  const end = start + pageSize;
  
  console.log("Slice params:", start, end);
  const slicedData = data.slice(start, end);
  console.log("Sliced data:", slicedData);

  return (
    <div>
      <ListGroup>
        {slicedData.map((item, i) => {
          console.log("Rendering item:", item);
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
