import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ListGroup,
  Button,
  Row,
  Col,
  Badge,
  Alert,
  Modal,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUserType } from "../../../core/selectors/user";
import { getTutorQualificationDataById } from "../../../core/selectors/tutor";
import { getTutorQualificationById } from "../../../core/actionCreators/tutor";
import { updateQualification, deleteQualification } from "../../../core/actionCreators/qualification";

// Custom CSS for hover effects
const qualCardStyle = {
  transition: 'all 0.3s ease',
};

const hoverStyle = {
  transform: 'translateY(-5px)',
  boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
};

export default function QualificationList(props) {
  // State for hover effect
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const dispatch = useDispatch();
  let { tutorId } = useParams();
  if (props.tutorId !== undefined && props.tutorId != "") {
    tutorId = props.tutorId;
  }
  const userType = useSelector(getUserType);
  const tutorQualificationData = useSelector(getTutorQualificationDataById);
  const [tutorQualifications, setTutorQualifications] = useState([]);

  // Add state for the edit modal and alert
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentQualification, setCurrentQualification] = useState(null);
  const [editAlert, setEditAlert] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    dispatch(getTutorQualificationById(tutorId));
  }, []);

  useEffect(() => {
    setTutorQualifications(tutorQualificationData);
  }, [tutorQualificationData]);

  // Function to handle opening the edit modal
  const handleEditClick = (qualification) => {
    setCurrentQualification(qualification);
    setShowEditModal(true);
    setEditAlert(null);
  };

  // Function to handle opening the delete modal
  const handleDeleteClick = (qualification) => {
    setCurrentQualification(qualification);
    setShowDeleteModal(true);
  };

  // Function to handle closing the edit modal
  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setCurrentQualification(null);
    setEditAlert(null);
  };

  // Function to show toast message
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  // Function to handle submitting the edit form
  const handleEditSubmit = (e) => {
    e.preventDefault();

    // Form validation
    const subject = e.target.elements.subject.value.trim();
    const grade = e.target.elements.grade.value.trim();
    const description = e.target.elements.description.value.trim();

    if (!subject || !grade || !description) {
      setEditAlert({
        type: "danger",
        message: "All fields are required",
      });
      return;
    }

    const updatedQualification = {
      id: currentQualification.id,
      subjectName: subject,
      grade: grade,
      description: description,
      userId: tutorId,
    };

    dispatch(updateQualification(updatedQualification));

    // Show success message
    setEditAlert({
      type: "success",
      message: "Qualification updated successfully",
    });

    // Refresh the qualification list after submission
    setTimeout(() => {
      handleCloseModal();
      dispatch(getTutorQualificationById(tutorId));
      showToast("Qualification updated successfully");
    }, 1000);
  };

  // Function to handle deleting a qualification
  const handleDeleteConfirm = () => {
    dispatch(deleteQualification(currentQualification.id));
    
    // Close the modal and refresh the qualification list
    handleCloseModal();
    
    // Refresh the qualification list after deletion
    setTimeout(() => {
      dispatch(getTutorQualificationById(tutorId));
      showToast("Qualification deleted successfully", "warning");
    }, 500);
  };

  // Render edit modal
  const renderEditModal = () => {
    if (!currentQualification) return null;

    return (
      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Qualification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editAlert && (
            <Alert
              variant={editAlert.type}
              dismissible
              onClose={() => setEditAlert(null)}
            >
              {editAlert.message}
            </Alert>
          )}
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                defaultValue={currentQualification.subjectName}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                name="grade"
                defaultValue={currentQualification.grade}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                defaultValue={currentQualification.description}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  // Render delete confirmation modal
  const renderDeleteModal = () => {
    if (!currentQualification) return null;

    return (
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this qualification?</p>
          <p><strong>Subject:</strong> {currentQualification.subjectName}</p>
          <p><strong>Grade:</strong> {currentQualification.grade}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  if (
    tutorQualifications === undefined ||
    tutorQualifications.length === undefined ||
    tutorQualifications.length === 0
  ) {
    return (
      <div>
        <h5 className="fw-bold mb-3">MY QUALIFICATION</h5>
        <Alert variant="info" className="mt-3">
          No qualifications available. This tutor has not added any
          qualifications yet.
        </Alert>
      </div>
    );
  }

  // Check if user is viewing their own profile to show edit icons
  const canEdit = userType === "tutor";

  return (
    <div>
      <h5 className="fw-bold mb-3">MY QUALIFICATION</h5>
      
      {/* Toast container for notifications */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast 
          show={toast.show} 
          onClose={() => setToast({...toast, show: false})}
          delay={3000}
          autohide
          bg={toast.type}
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">
              {toast.type === 'success' ? 'Success' : 'Notification'}
            </strong>
          </Toast.Header>
          <Toast.Body className={toast.type === 'success' ? 'text-white' : ''}>
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      
      <Row className="mt-3 g-3">
        {tutorQualifications.map((item, i) => (
          <Col
            xs={12}
            md={6}
            lg={4}
            key={i}
            className="mb-0"
          >
            <div 
              className="h-100 p-3 border rounded shadow-sm"
              style={{
                ...qualCardStyle,
                ...(hoveredCard === i ? hoverStyle : {})
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <span className="fw-bold">{item.subjectName}</span>
                {canEdit && (
                  <div>
                    <Button
                      variant="link"
                      className="p-0 me-2 text-primary"
                      onClick={() => handleEditClick(item)}
                      title="Edit qualification"
                      aria-label="Edit qualification"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button
                      variant="link"
                      className="p-0 text-danger"
                      onClick={() => handleDeleteClick(item)}
                      title="Delete qualification"
                      aria-label="Delete qualification"
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                )}
              </div>
              <div className="mb-2">
                <span className="text-muted">{`Grade: ${item.grade}`}</span>
              </div>
              <div className="fw-light small">{`Description: ${item.description}`}</div>
            </div>
          </Col>
        ))}
      </Row>
      {renderEditModal()}
      {renderDeleteModal()}
    </div>
  );
}
