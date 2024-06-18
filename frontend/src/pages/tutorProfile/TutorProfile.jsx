import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CourseList from "./courseList/CourseList";
import ReviewList from "./reviewList/ReviewList";
import QualificationList from "./qualificationList/QualificationList";
import FileList from "./fileList/FileList";
import Page from "../../componenets/page/Page";
import Student from "./privilegedFeatures/Student";
import Tutor from "./privilegedFeatures/Tutor";
import { getUserType } from "../../core/selectors/user";
import { getTutorInfoDataById } from "../../core/selectors/tutor";
import { getTutorInfoById } from "../../core/actionCreators/tutor";
import { filesApi } from "../../core/endpoints";

export default function TutorProfile(props) {
  const dispatch = useDispatch();
  let { tutorId } = useParams();
  if (props.tutorId !== undefined && props.tutorId != "") {
    tutorId = props.tutorId;
  }
  const tutorInfoDataById = useSelector(getTutorInfoDataById);
  const [tutorInfoData, setTutorInfoData] = useState([]);
  useEffect(() => {
    dispatch(getTutorInfoById(tutorId));
  }, []);
  useEffect(() => {
    setTutorInfoData(tutorInfoDataById[0]);
  }, [tutorInfoDataById]);

  // TODO: Remove
  const photo = "/no-image.png";

  const userType = useSelector(getUserType);

  const getPicPath = () => {
    if (tutorInfoData && tutorInfoData.picPath) {
      return `${filesApi}/${tutorInfoData.picPath}`;
    }
    return photo;
  };

  function renderProfile() {
    return (
      <Container className="border border-1 rounded">
        <Row style={{ padding: 5 }}>
          <Col xs={2}>
            <img src={getPicPath()} style={{ width: "148px" }} />
          </Col>
          <Col>
            <Row>
              <Col>
                {" "}
                <span style={{ float: "left", fontSize: 20 }}>
                  {tutorInfoData?.firstName + " " + tutorInfoData?.lastName}
                </span>
              </Col>
            </Row>
            <br />
            <Row>
              <span className="text-muted" style={{ float: "left" }}>
                {`Age: ${tutorInfoData?.age ?? 'N/A'}`}
              </span>
              <span className="mt-2 text-muted" style={{ float: "left" }}>
                {tutorInfoData?.about}
              </span>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }

  function renderPrivilegedFeatures() {
    if (userType === "student") {
      return <Student tutorId={tutorId} />;
    }

    if (userType === "tutor") {
      return <Tutor />;
    }

    return null;
  }

  return (
    <Page>
      {renderProfile()}
      <br />
      <CourseList tutorId={tutorId} />
      <br />
      <br />
      <QualificationList tutorId={tutorId} />
      <br />
      <br />
      <FileList tutorId={tutorId} />
      <br />
      <br />
      <ReviewList tutorId={tutorId} />
      <br />
      {(userType === "student" || userType === "tutor") &&
        renderPrivilegedFeatures()}
    </Page>
  );
}
