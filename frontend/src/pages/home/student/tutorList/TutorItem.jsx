import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { filesApi } from "../../../../core/endpoints.js";
import { faker } from "@faker-js/faker";

export default function TutorItem(props) {
  console.log("TutorItem props:", props);
  const {
    userId,
    tutorId,
    firstName,
    lastName,
    about,
    posts = [],
    picPath,
  } = props.item || {};

  console.log("Destructured TutorItem data:", { userId, firstName, lastName, posts });

  // Generate a consistent avatar using userId as seed
  const generateAvatar = () => {
    // Set seed based on userId if available
    if (userId) {
      faker.seed(parseInt(userId, 10));
    }
    return faker.image.avatar();
  };

  let profilePicPath;
  if (!picPath) {
    profilePicPath = generateAvatar();
  } else {
    profilePicPath = `${filesApi}/${picPath}`;
  }

  const navigate = useNavigate();
  const getSubjectNames = (posts) => {
    if (!Array.isArray(posts) || posts.length === 0) return "No subjects";
    
    let subjectNames = [];
    posts.forEach((x) => subjectNames.push(x.subjectName));
    return subjectNames.join(", ");
  };

  const getHighestRate = (posts) => {
    if (!Array.isArray(posts) || posts.length === 0) return 0;
    return Math.max(...posts.map((item) => item.ratePerHour || 0));
  };

  const handleViewDetails = () => {
    navigate(`/tutor/${userId}`);
  };

  return (
    <div
      className="p-4 mb-3 border rounded shadow-sm"
      style={{ borderColor: "#e0e0e0", backgroundColor: "#fff" }}
    >
      <Row className="align-items-center">
        <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
          <img 
            src={profilePicPath} 
            style={{ 
              width: "120px", 
              height: "120px", 
              objectFit: "cover",
              borderRadius: "50%" 
            }} 
            alt={`${firstName} ${lastName}`}
          />
        </Col>
        <Col xs={12} md={8}>
          <Row className="mb-2">
            <Col>
              <h4 className="mb-0">{`${firstName} ${lastName}`}</h4>
            </Col>
          </Row>
          
          <Row className="mb-2">
            <Col>
              <p className="text-muted mb-1">{about}</p>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <p className="text-muted mb-0">
                <strong>Teaches:</strong> {getSubjectNames(posts)}
              </p>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={2} className="d-flex flex-column align-items-center justify-content-center">
          <h5 className="text-primary mb-3">{`$${getHighestRate(posts)}/hr`}</h5>
          <Button 
            variant="outline-primary" 
            onClick={handleViewDetails}
            className="px-4"
          >
            View Details
          </Button>
        </Col>
      </Row>
    </div>
  );
}
