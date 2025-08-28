// @flow
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function FilterBar(props) {
  const dispatch = useDispatch();

  let subjectNameControl = useRef(null);
  let levelControl = useRef(null);
  let maxRatePerHourControl = useRef(null);
  let genderControl = useRef(null);

  const [filters, setFilters] = useState({
    subjectName: undefined,
    level: undefined,
    maxRatePerHour: 99,
    gender: undefined,
  });

  React.useEffect(() => {
    console.log("FilterBar useEffect triggered with filters:", filters);
    if (props.fetchOfferCourse) {
      console.log("Dispatching fetchOfferCourse action");
      dispatch(props.fetchOfferCourse({ filters }));
    } else {
      console.error("fetchOfferCourse prop is not available");
    }
  }, [
    dispatch,
    props.fetchOfferCourse,
    filters.subjectName,
    filters.level,
    filters.maxRatePerHour,
    filters.gender,
  ]);

  const filterTutors = () => {
    let subjectName = subjectNameControl.current.value;

    if (subjectName === undefined || subjectName == "") subjectName = undefined;

    let newFilters = {
      subjectName: subjectName,
      level:
        levelControl.current.value === "Any"
          ? undefined
          : levelControl.current.value,
      maxRatePerHour: maxRatePerHourControl.current.value,
      gender:
        genderControl.current.value === "Any"
          ? undefined
          : genderControl.current.value,
    };

    setFilters(newFilters);
  };

  return (
    <Container
      style={{ borderColor: "#808080" }}
      className="p-3 border border-1 rounded"
    >
      <Row>
        <Col>
          <Form.Label>Subject</Form.Label>
          <Form.Control size="sm" ref={subjectNameControl} type="text" />
        </Col>
        <Col>
          <Form.Label>Level</Form.Label>
          <Form.Select size="sm" ref={levelControl} defaultValue="Any">
            <option>Any</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label>Max Rate</Form.Label>
          <Form.Control
            size="sm"
            ref={maxRatePerHourControl}
            type="number"
          />
        </Col>
        <Col>
          <Form.Label>Gender</Form.Label>
          <Form.Select size="sm" ref={genderControl} defaultValue="Any">
            <option>Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
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
            onClick={filterTutors}
          >
            Search
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
