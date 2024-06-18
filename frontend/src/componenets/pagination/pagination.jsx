import React from "react";
import { Pagination } from "react-bootstrap";

export default function Paging(props) {
  const {
    itemCount,
    pageSize = 5,
    active = 1,
    toggleActive,
    className,
  } = props;

  if (itemCount <= pageSize) {
    return null;
  }

  const pageChanged = (event) => {
    toggleActive(parseInt(event.target.text));
  };

  const getPaginationItems = () => {
    let paginationItems = [];
    let pageNo = 1;
    let pageCount = itemCount / pageSize;
    pageCount += pageCount % 1 !== 0 ? 1 : 0;

    while (pageNo <= pageCount) {
      paginationItems.push(
        <Pagination.Item
          onClick={(event) => pageChanged(event)}
          key={pageNo}
          active={pageNo === active}
        >
          {pageNo}
        </Pagination.Item>
      );
      pageNo++;
    }

    return paginationItems;
  };

  return <Pagination className={className}>{getPaginationItems()}</Pagination>;
}
