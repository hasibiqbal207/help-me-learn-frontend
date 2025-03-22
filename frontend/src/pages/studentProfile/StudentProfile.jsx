import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getCurrentUser } from "../../core/selectors/user";
import Page from "../../components/page/Page";

function StudentProfile() {
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const currentUser = useSelector(getCurrentUser);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // For now, we'll use the current user data
    // In a real implementation, you would fetch the student profile data from an API
    setStudentData(currentUser);
  }, [currentUser, studentId]);

  if (!studentData) {
    return (
      <Page>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <Card>
                <Card.Body>
                  <Card.Title>Loading...</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Student Profile</Card.Title>
                <hr />
                <Row>
                  <Col md={4}>
                    <div className="text-center mb-3">
                      <img
                        src={studentData.profilePicture || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                        style={{ width: "150px", height: "150px" }}
                      />
                    </div>
                  </Col>
                  <Col md={8}>
                    <h4>{`${studentData.firstName} ${studentData.lastName}`}</h4>
                    <p><strong>Email:</strong> {studentData.email}</p>
                    {studentData.phone && <p><strong>Phone:</strong> {studentData.phone}</p>}
                    {studentData.bio && (
                      <>
                        <h5>About Me</h5>
                        <p>{studentData.bio}</p>
                      </>
                    )}
                  </Col>
                </Row>
                <hr />
                <Row className="mt-3">
                  <Col>
                    <h5>My Courses</h5>
                    <p>No courses enrolled yet.</p>
                    {/* Here you would typically map through enrolled courses */}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <h5>My Learning Progress</h5>
                    <p>Start learning to see your progress!</p>
                    {/* Here you would show learning progress metrics */}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col className="text-center">
                    <Button variant="primary">Edit Profile</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Page>
  );
}

export default StudentProfile; 