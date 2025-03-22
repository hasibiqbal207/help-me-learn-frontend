import React, { useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import AdminSidebar from "./AdminSidebar";
import { getUserType, isAuthenticated } from "../../core/selectors/user";

const AdminLayout = ({ children }) => {
  const userType = useSelector(getUserType);
  const authenticated = useSelector(isAuthenticated);
  const navigate = useNavigate();
  
  // Debug component rendering and props
  console.log("AdminLayout rendered with children:", children);
  console.log("AdminLayout - User type:", userType);
  console.log("AdminLayout - Is authenticated:", authenticated);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authenticated) {
      console.log("AdminLayout - Redirecting to login (not authenticated)");
      navigate("/login");
    }
  }, [authenticated, navigate]);
  
  // Show loading or redirect for unauthenticated users
  if (!authenticated) {
    console.log("AdminLayout - Returning null (not authenticated)");
    return null; // Will be redirected by the useEffect
  }
  
  // Show unauthorized message if authenticated but not admin
  if (userType !== "admin") {
    console.log("AdminLayout - Showing unauthorized message (not admin)");
    return (
      <div>
        <Header headerOptions={[]} />
        <br />
        <Container fluid="lg">
          <Alert variant="danger">
            <Alert.Heading>Unauthorized Access</Alert.Heading>
            <p>
              You don't have permission to access the admin panel. 
              This area is restricted to administrators only.
            </p>
          </Alert>
        </Container>
      </div>
    );
  }
  
  // Admin user - show the admin panel
  console.log("AdminLayout - Rendering admin panel");
  return (
    <div>
      <Header headerOptions={[]} />
      <br />
      <Container fluid="lg">
        <Row>
          <Col md={3} className="mb-4">
            <AdminSidebar />
          </Col>
          <Col md={9}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLayout; 