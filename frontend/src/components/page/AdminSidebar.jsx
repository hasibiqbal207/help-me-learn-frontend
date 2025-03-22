import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUserTie, FaUserGraduate } from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route) => {
    // Dashboard - only active when exactly /admin
    if (route === "/admin" && path === "/admin") {
      return "active";
    }
    // Other routes - active when path starts with route
    if (route !== "/admin" && path.startsWith(route)) {
      return "active";
    }
    return "";
  };

  const sidebarStyle = {
    minHeight: "calc(100vh - 80px)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
  };

  const navLinkStyle = (active) => ({
    color: active ? "#007bff" : "#495057",
    backgroundColor: active ? "rgba(0, 123, 255, 0.1)" : "transparent",
    borderRadius: "4px",
    padding: "10px 15px",
    marginBottom: "8px",
    fontWeight: active ? "600" : "400",
    transition: "all 0.2s ease",
  });

  return (
    <div className="admin-sidebar bg-light p-3 h-100" style={sidebarStyle}>
      <h5 className="text-muted mb-4 border-bottom pb-2">Admin Panel</h5>
      <Nav className="flex-column">
        <Nav.Link 
          as={Link} 
          to="/admin" 
          className={`d-flex align-items-center mb-2`}
          style={navLinkStyle(isActive("/admin") === "active")}
        >
          <FaTachometerAlt className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/admin/tutors" 
          className={`d-flex align-items-center mb-2`}
          style={navLinkStyle(isActive("/admin/tutors") === "active")}
        >
          <FaUserTie className="me-2" /> Tutor List
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/admin/students" 
          className={`d-flex align-items-center mb-2`}
          style={navLinkStyle(isActive("/admin/students") === "active")}
        >
          <FaUserGraduate className="me-2" /> Student List
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminSidebar; 