// @flow
import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { fetchTutorsProfileList } from "../../../../../core/actionCreators/manageTutorsProfile";

export default function FilterBar() {
  const urlSearchParams = new URLSearchParams(useLocation().search);
  var status = urlSearchParams.get("status");

  const dispatch = useDispatch();

  var statusRef = useRef(null);

  const [filters, setFilters] = useState({
    status: status ? status : "-1",
  });

  React.useEffect(() => {
    dispatch(fetchTutorsProfileList({ filters }));
  }, [filters]);

  const handleSubmit = () => {
    var newFilters = {
      status: statusRef.current.value,
    };
    setFilters(newFilters);
  };
  return (
    <div>
      <Container
        style={{ borderColor: "#808080" }}
        className="p-3 border border-1 rounded"
      >
        <Row>
          <Col>
            <Form.Label>Status</Form.Label>
            <Form.Select
              size="sm"
              ref={statusRef}
              type="text"
              defaultValue={filters.status}
            >
              <option value="-1">Any</option>
              <option value="101">Approved</option>
              <option value="100">Pending</option>
              <option value="102">Rejected</option>
            </Form.Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button
              className="float-end"
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
