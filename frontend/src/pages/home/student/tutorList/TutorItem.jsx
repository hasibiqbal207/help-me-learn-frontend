import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export default function TutorItem(props) {
  const {
    userId,
    tutorId,
    tutorFirstName,
    tutorLastName,
    ratePerHour,
    about,
    posts = [],
    picPath,
  } = props.item;

  let profilePicPath;
  if (picPath == undefined) profilePicPath = "no-image.png";
  else profilePicPath = `${process.env.REACT_APP_API_URL}/${picPath}`;

  const navigate = useNavigate();
  const getSubjectNames = (posts) => {
    let subjectNames = [];

    posts.forEach((x) => subjectNames.push(x.subjectName));
    return subjectNames.join(", ");
  };

  const getHighestRate = (posts) => {
    return Math.max(...posts.map((item) => item.ratePerHour))
  };

  return (
    <div
      style={{ borderColor: "#808080" }}
      className="p-3 border-top border-start border-end border-1 rounded"
    >
      <Row
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/tutor/${userId}`)}
      >
        <Col xs={2}>
          <img src={profilePicPath} style={{ width: "148px" }} />
        </Col>
        <Col>
          <Row>
            <Col>
              {" "}
              <span
                style={{ float: "left" }}
              >{`${tutorFirstName} ${tutorLastName}`}</span>
            </Col>
            <Col>
              {" "}
              <span style={{ float: "right" }}>{`$${getHighestRate(posts)}/hr`}</span>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              {" "}
              <span className="text-muted" style={{ float: "left" }}>
                {about}
              </span>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              {" "}
              <span className="text-muted" style={{ float: "left" }}>
                {`Teaches: ${getSubjectNames(posts)}`}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
