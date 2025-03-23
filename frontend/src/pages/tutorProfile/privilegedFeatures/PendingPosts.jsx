import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Container, Spinner, Alert, Badge } from "react-bootstrap";
import { getCurrentUser } from "../../../core/selectors/user";
import { fetchOfferCourse } from "../../../core/actionCreators/offerCourse";
import { getCourseSearchResult } from "../../../core/selectors/offerCourse";

const PendingPosts = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const offerCourseData = useSelector(getCourseSearchResult);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if we have a current user
    if (currentUser && currentUser.id) {
      setLoading(true);
      
      // Call the API endpoint to fetch posts with status 100 (pending)
      // and filter by the current user's ID
      dispatch(
        fetchOfferCourse({
          filters: {
            status: "100",
            tutorProfileId: currentUser.id,
          },
        })
      );
      
      // Set loading to false after a short delay
      // In a real app, this would be handled by the reducer based on API response
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [currentUser, dispatch]);

  // Helper function to format the status code to readable text
  const formatStatus = (statusCode) => {
    switch (statusCode) {
      case "100":
        return <Badge bg="warning">Pending</Badge>;
      case "101":
        return <Badge bg="success">Approved</Badge>;
      case "102":
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  // Filter out only pending posts for this tutor
  const pendingPosts = offerCourseData.filter(post => 
    post.status === "100" && 
    post.tutorProfileId === currentUser?.id
  );

  return (
    <Container className="mt-4">
      <h3>Pending Tutoring Posts</h3>
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : pendingPosts.length === 0 ? (
        <Alert variant="info">You don't have any pending posts</Alert>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Rate/Hour</th>
              <th>Language</th>
              <th>Experience</th>
              <th>Available Time</th>
              <th>Created Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.subjectName}</td>
                <td>{post.description}</td>
                <td>${post.ratePerHour}</td>
                <td>{post.language}</td>
                <td>{post.experienceYears} years</td>
                <td>{post.availableTime}</td>
                <td>{new Date(post.createdDateTime).toLocaleDateString()}</td>
                <td>{formatStatus(post.status)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default PendingPosts; 