import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ListGroup, Badge, Button, Row, Col, Alert } from "react-bootstrap";
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

  if (
    tutorCourses === undefined ||
    tutorCourses.length === undefined ||
    tutorCourses.length === 0
  ) {
    return (
      <div>
        <span>MY COURSES</span>
        <Alert variant="info" className="mt-3">
          No courses available. This tutor has not added any courses yet.
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <span>MY COURSES</span>
      <ListGroup style={{ padding: "1.0rem 0 0 0" }}>
        {tutorCourses.map((item, i) => {
          return (
            <ListGroup.Item key={i}>
              <div>
                <div>
                  <span className="fw-bold">{item.subjectName}</span>
                </div>
                <div>
                  <span className="text-muted">{`Fee: $${item.ratePerHour}/hr`}</span>
                </div>
                <div>
                  <span className="text-muted">{`Level: ${item.level}`}</span>
                </div>
                <div>
                  <span className="text-muted">{`Language: ${item.language}`}</span>
                </div>
                <div>
                  <span className="text-muted">{`Experience: ${item.experienceYears} years`}</span>
                </div>
                <div className="mb-2">
                  <span className="text-muted">{`Available Time: ${item.availableTime}`}</span>
                </div>
                <div className="fw-light">{item.description}</div>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
