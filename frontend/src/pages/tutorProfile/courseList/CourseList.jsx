import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
  ListGroup, 
  Badge, 
  Button, 
  Row, 
  Col, 
  Alert, 
  Card, 
  Container,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getUserType } from "../../../core/selectors/user";
import { getTutorCourseDataById } from "../../../core/selectors/tutor";
import { getTutorOfferedCourseById } from "../../../core/actionCreators/tutor";

export default function CourseList(props) {
  const dispatch = useDispatch();
  let { tutorId } = useParams();
  if (props.tutorId !== undefined && props.tutorId != "") {
    tutorId = props.tutorId;
  }
  const userType = useSelector(getUserType);
  const tutorCourseData = useSelector(getTutorCourseDataById);
  const [tutorCourses, setTutorCourses] = useState([]);
  
  useEffect(() => {
    dispatch(getTutorOfferedCourseById(tutorId));
  }, []);
  
  useEffect(() => {
    setTutorCourses(tutorCourseData);
  }, [tutorCourseData]);

  console.log(tutorCourses);

  const handleEdit = (courseId) => {
    // Add edit functionality here
    console.log("Edit course:", courseId);
  };

  const handleDelete = (courseId) => {
    // Add delete functionality here
    console.log("Delete course:", courseId);
  };

  if (
    tutorCourses === undefined ||
    tutorCourses.length === undefined ||
    tutorCourses.length === 0
  ) {
    return (
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">MY COURSES</h4>
        </div>
        <Alert variant="info">
          No courses available. This tutor has not added any courses yet.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">MY COURSES</h4>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {tutorCourses.map((item, i) => (
          <Col key={i}>
            <Card className="h-100 shadow-sm">
              {item.status === 100 && (
                <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">
                  Pending Approval
                </Badge>
              )}
              <Card.Body>
                <Card.Title className="fw-bold">{item.subjectName}</Card.Title>
                <Card.Text className="text-muted">
                  <small className="d-block mb-1">{`Fee: $${item.ratePerHour}/hr`}</small>
                  <small className="d-block mb-1">{`Language: ${item.language}`}</small>
                  <small className="d-block mb-1">{`Experience: ${item.experienceYears} years`}</small>
                  <small className="d-block mb-2">{`Available Time: ${item.availableTime}`}</small>
                  <div className="mt-2 fw-light">{item.description}</div>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-top-0">
                <div className="d-flex justify-content-end">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit</Tooltip>}
                  >
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      <FaEdit />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete</Tooltip>}
                  >
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </OverlayTrigger>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
