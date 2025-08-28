import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { faker } from '@faker-js/faker';
import CourseList from "./courseList/CourseList";
import ReviewList from "./reviewList/ReviewList";
import QualificationList from "./qualificationList/QualificationList";
import FileList from "./fileList/FileList";
import Page from "../../components/page/Page";
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
  console.log("tutorInfoDataById from selector:", tutorInfoDataById);
  const [tutorInfoData, setTutorInfoData] = useState([]);
  const [fakerAvatar, setFakerAvatar] = useState('');
  
  useEffect(() => {
    dispatch(getTutorInfoById(tutorId));
    // Generate a consistent avatar based on tutorId
    // Set seed based on tutorId to ensure the same tutor always gets the same avatar
    try {
      faker.seed(parseInt(tutorId, 10) || 0);
      const avatar = faker.image.avatar();
      console.log('Generated Faker avatar:', avatar);
      setFakerAvatar(avatar);
    } catch (error) {
      console.error('Error generating Faker avatar:', error);
      // Set a fallback avatar URL
      setFakerAvatar('https://via.placeholder.com/148x148?text=Tutor');
    }
  }, [tutorId]);
  
  useEffect(() => {
    console.log("tutorInfoDataById changed:", tutorInfoDataById);
    if (tutorInfoDataById && tutorInfoDataById.length > 0) {
      setTutorInfoData(tutorInfoDataById[0]);
    } else {
      // Handle case when no data is available
      console.log("No tutor data available");
    }
  }, [tutorInfoDataById]);

  // Add a separate effect to log tutorInfoData after it's been updated
  useEffect(() => {
    console.log("tutorInfoData updated:", tutorInfoData);
  }, [tutorInfoData]);

  const userType = useSelector(getUserType);

  const getPicPath = () => {
    // Log the values for debugging
    console.log('filesApi:', filesApi);
    console.log('tutorInfoData:', tutorInfoData);
    console.log('fakerAvatar:', fakerAvatar);
    
    if (tutorInfoData && tutorInfoData.picPath) {
      const imagePath = `${filesApi}/${tutorInfoData.picPath}`;
      console.log('Using real profile pic:', imagePath);
      return imagePath;
    }
    
    console.log('Using faker avatar:', fakerAvatar);
    return fakerAvatar; // Use faker avatar instead of no-image.png
  };

  function renderProfile() {
    return (
      <Container className="border border-1 rounded">
        <Row style={{ padding: 5 }}>
          <Col xs={2}>
            <img 
              src={getPicPath()} 
              style={{ width: "148px" }}              
            />
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
                {`Age: ${tutorInfoData?.age ?? "N/A"}`}
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
