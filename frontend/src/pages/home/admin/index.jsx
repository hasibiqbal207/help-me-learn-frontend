import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Table, Button, Modal, Form, Row, Col, Badge, Container, Toast, ToastContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourseListByStatus, saveCourse, updateCourseStatus } from "../../../core/actionCreators/course";
import { fetchOfferCourse, updateOfferCourseStatus } from "../../../core/actionCreators/offerCourse";
import { getCourseSearchResult } from "../../../core/selectors/offerCourse";
import { searchPost, updatePostStatus } from "../../../core/actionCreators/post";
import { getPostSearchResult, getPostLoading } from "../../../core/selectors/post";

export default function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // State for the Add New Subject modal
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState({
    department: "",
    subjectName: "",
    description: ""
  });
  
  // State for approval/rejection confirmation modals
  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    type: '', // 'approve' or 'reject'
    itemType: '', // 'post', 'course', or 'tutorCourse' 
    itemId: null,
    tutorId: null,
    title: '',
    message: ''
  });
  
  // State for action processing
  const [processing, setProcessing] = useState({
    postId: null,
    loading: false
  });
  
  // State for notifications
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success"
  });

  useEffect(() => {
    console.log("Admin component mounted, fetching pending data");
    
    // Fetch pending tutor courses (status 100)
    dispatch(fetchOfferCourse({ filters: { status: "100" } }));
    
    // Fetch pending subjects/courses (status 100)
    dispatch(fetchCourseListByStatus("100"));
    
    // Fetch pending posts (status 100)
    dispatch(searchPost({ status: "100" }));
  }, [dispatch]);

  // Get data directly from the redux store using selectors
  const pendingCourses = useSelector(state => state.course?.data || []);
  const pendingTutorCourses = useSelector(getCourseSearchResult);
  const pendingPosts = useSelector(getPostSearchResult);
  const loadingPosts = useSelector(getPostLoading);
  
  // Log the current state to debug
  useEffect(() => {
    console.log("Current redux state in Admin component:");
    console.log("Pending courses:", pendingCourses);
    console.log("Pending tutor courses:", pendingTutorCourses);
    console.log("Pending posts:", pendingPosts);
  }, [pendingCourses, pendingTutorCourses, pendingPosts]);

  // Handle view, approve, reject actions for tutor course offerings
  const handleTutorCourseAction = (action, courseId, tutorId) => {
    console.log(`Tutor course action: ${action} for course ${courseId} offered by tutor ${tutorId}`);
    
    if (action === 'view') {
      navigate(`/tutor/${tutorId}`);
    } else if (action === 'approve') {
      // Show confirmation modal
      setConfirmationModal({
        show: true,
        type: 'approve',
        itemType: 'tutorCourse',
        itemId: courseId,
        tutorId: tutorId,
        title: 'Approve Course Offering',
        message: 'Are you sure you want to approve this course offering? It will be visible to all students.'
      });
    } else if (action === 'reject') {
      // Show confirmation modal
      setConfirmationModal({
        show: true,
        type: 'reject',
        itemType: 'tutorCourse',
        itemId: courseId,
        tutorId: tutorId,
        title: 'Reject Course Offering',
        message: 'Are you sure you want to reject this course offering? This action cannot be undone.'
      });
    }
  };

  // Handle view, approve, reject actions for courses/subjects
  const handleCourseAction = (action, courseId) => {
    console.log(`Course action: ${action} for course ${courseId}`);
    
    if (action === 'view') {
      // Show details in a modal (optional future enhancement)
    } else if (action === 'approve') {
      // Show confirmation modal
      setConfirmationModal({
        show: true,
        type: 'approve',
        itemType: 'course',
        itemId: courseId,
        title: 'Approve Subject',
        message: 'Are you sure you want to approve this subject? It will be available for all tutors to offer.'
      });
    } else if (action === 'reject') {
      // Show confirmation modal
      setConfirmationModal({
        show: true,
        type: 'reject',
        itemType: 'course',
        itemId: courseId,
        title: 'Reject Subject',
        message: 'Are you sure you want to reject this subject? This action cannot be undone.'
      });
    }
  };

  // Handle view, approve, reject actions for posts
  const handlePostAction = (action, postId, tutorId) => {
    console.log(`Post action: ${action} for post ${postId} by tutor ${tutorId}`);
    
    if (action === 'view') {
      navigate(`/tutor/${tutorId}`);
    } else if (action === 'approve') {
      // Show confirmation modal
      setConfirmationModal({
        show: true,
        type: 'approve',
        itemType: 'post',
        itemId: postId,
        tutorId: tutorId,
        title: 'Approve Post',
        message: 'Are you sure you want to approve this post? It will be visible to all students.'
      });
    } else if (action === 'reject') {
      // Show confirmation modal
      setConfirmationModal({
        show: true,
        type: 'reject',
        itemType: 'post',
        itemId: postId,
        tutorId: tutorId,
        title: 'Reject Post',
        message: 'Are you sure you want to reject this post? This action cannot be undone.'
      });
    }
  };

  // Function to handle action confirmation
  const handleConfirmAction = () => {
    const { type, itemType, itemId, tutorId } = confirmationModal;
    
    console.log("Confirmation action:", { type, itemType, itemId, tutorId });
    
    // Set the processing state
    setProcessing({
      postId: itemId,
      loading: true
    });
    
    // Close the modal immediately to prevent multiple clicks
    setConfirmationModal(prevState => ({
      ...prevState,
      show: false
    }));
    
    if (itemType === 'post') {
      // Explicitly define status codes
      const statusCode = type === 'approve' ? "101" : "102";
      console.log(`Attempting to update post ${itemId} status to ${statusCode}`);
      
      // Dispatch the action
      dispatch(updatePostStatus(itemId, statusCode));
      
      // Show toast notification
      showToast(`Post ${type === 'approve' ? 'approved' : 'rejected'} successfully`, 
                type === 'approve' ? 'success' : 'danger');
      
      // Refresh posts after a short delay
      setTimeout(() => {
        console.log(`Refreshing posts after ${type} action`);
        dispatch(searchPost({ status: "100" }));
        setProcessing({
          postId: null,
          loading: false
        });
      }, 1500); // Increased delay to ensure update completes
    } else if (itemType === 'course') {
      // Similar pattern for course items
      const statusCode = type === 'approve' ? "101" : "102";
      dispatch(updateCourseStatus(itemId, statusCode));
      showToast(`Subject ${type === 'approve' ? 'approved' : 'rejected'} successfully`, 
                type === 'approve' ? 'success' : 'danger');
      
      setTimeout(() => {
        dispatch(fetchCourseListByStatus("100"));
        setProcessing({
          postId: null,
          loading: false
        });
      }, 1500);
    } else if (itemType === 'tutorCourse') {
      // Similar pattern for tutor course items
      const statusCode = type === 'approve' ? "101" : "102";
      dispatch(updateOfferCourseStatus(itemId, statusCode));
      showToast(`Course offering ${type === 'approve' ? 'approved' : 'rejected'} successfully`, 
                type === 'approve' ? 'success' : 'danger');
      
      setTimeout(() => {
        dispatch(fetchOfferCourse({ filters: { status: "100" } }));
        setProcessing({
          postId: null,
          loading: false
        });
      }, 1500);
    }
  };

  // Helper function to show toast notifications
  const showToast = (message, variant = "success") => {
    setToast({
      show: true,
      message,
      variant
    });
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Function to open the Add New Subject modal
  const handleAddNewSubject = () => {
    setShowModal(true);
  };

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({
      ...newSubject,
      [name]: value
    });
  };

  // Function to submit the new subject
  const handleSubmitNewSubject = () => {
    // Validate form fields
    if (!newSubject.department || !newSubject.subjectName) {
      alert("Department and Subject Name are required fields");
      return;
    }

    // Prepare data for API
    const courseData = {
      ...newSubject,
      status: "100" // Set as pending for admin approval
    };

    console.log("Submitting new subject:", courseData);
    
    // Dispatch action to save the new course/subject
    dispatch(saveCourse(courseData));
    
    // Close the modal and reset form
    setShowModal(false);
    setNewSubject({
      department: "",
      subjectName: "",
      description: ""
    });
    
    // Show success notification
    showToast("Subject submitted for approval", "success");
    
    // Refresh the pending courses list after a short delay
    setTimeout(() => {
      console.log("Refreshing course list after adding new subject");
      dispatch(fetchCourseListByStatus("100"));
    }, 1000);
  };

  console.log(pendingPosts);
  return (
    <div>
      <h4 className="mb-4 border-bottom pb-2">Dashboard</h4>
      
      {/* Toast notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={toast.show} 
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
          bg={toast.variant}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className={toast.variant === "danger" ? "text-white" : ""}>
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      
      {/* Pending Posts Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>
            Pending Posts
            <Button 
              variant="primary" 
              size="sm" 
              className="float-end"
              onClick={() => dispatch(searchPost({ status: "100" }))}
            >
              Refresh
            </Button>
          </Card.Title>
          
          {loadingPosts ? (
            <div className="text-center my-4">
              <span className="spinner-border text-primary" role="status"></span>
              <p className="mt-2">Loading pending posts...</p>
            </div>
          ) : pendingPosts && pendingPosts.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Subject</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingPosts.map((post) => (
                  <tr key={post.id || `post-${Math.random()}`}>
                    <td>{post.department || '-'}</td>
                    <td>{post.subjectName || 'General Post'}</td>
                    <td>
                      {post.description || '-'}
                      <small className="d-block text-muted mt-1">
                        {post.tutorName && `Tutor: ${post.tutorName}`}
                        {!post.tutorName && post.tutorProfileId && ` (ID: ${post.tutorProfileId})`}
                        {post.ratePerHour && `, Fee: $${post.ratePerHour}/hr`}
                        {post.experienceYears && `, Exp: ${post.experienceYears} years`}
                      </small>
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handlePostAction('view', post.id, post.tutorProfileId)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handlePostAction('approve', post.id, post.tutorProfileId)}
                        disabled={processing.loading && processing.postId === post.id}
                      >
                        {processing.loading && processing.postId === post.id ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            Processing...
                          </>
                        ) : 'Approve'}
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handlePostAction('reject', post.id, post.tutorProfileId)}
                        disabled={processing.loading && processing.postId === post.id}
                      >
                        {processing.loading && processing.postId === post.id ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            Processing...
                          </>
                        ) : 'Reject'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No pending posts found.</p>
          )}
        </Card.Body>
      </Card>
      
      {/* Pending Tutor Course Offerings Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="mb-4">Pending Tutor Course Offerings</Card.Title>
          
          {pendingTutorCourses && pendingTutorCourses.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {pendingTutorCourses.map((tutorCourse) => (
                <Col key={tutorCourse.id || `course-${Math.random()}`}>
                  <Card className="h-100 shadow-sm">
                    <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">
                      Pending Approval
                    </Badge>
                    <Card.Body>
                      <Card.Title className="fw-bold">
                        {tutorCourse.subjectName || tutorCourse.courseName || tutorCourse.subject || 'Mathematics'}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {tutorCourse.tutorName || `${tutorCourse.firstName || ''} ${tutorCourse.lastName || ''}`}
                      </Card.Subtitle>
                      <Card.Text className="text-muted">
                        <small className="d-block mb-1">{`Fee: $${tutorCourse.ratePerHour || '25'}/hr`}</small>
                        {tutorCourse.language && <small className="d-block mb-1">{`Language: ${tutorCourse.language}`}</small>}
                        <small className="d-block mb-1">{`Experience: ${tutorCourse.experienceYears || tutorCourse.experienceLevel || 'Intermediate'}`}</small>
                        {tutorCourse.availableTime && <small className="d-block mb-2">{`Available Time: ${tutorCourse.availableTime}`}</small>}
                        {tutorCourse.description && <div className="mt-2 fw-light">{tutorCourse.description}</div>}
                      </Card.Text>
                      <div className="d-flex gap-2 mt-3">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleTutorCourseAction('view', tutorCourse.id, tutorCourse.tutorId || tutorCourse.userId)}
                        >
                          View Profile
                        </Button>
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          onClick={() => handleTutorCourseAction('approve', tutorCourse.id, tutorCourse.tutorId || tutorCourse.userId)}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleTutorCourseAction('reject', tutorCourse.id, tutorCourse.tutorId || tutorCourse.userId)}
                        >
                          Reject
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">No pending tutor course offerings found.</p>
          )}
        </Card.Body>
      </Card>
      
      {/* Pending Subject/Course Requests Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>
            Pending Subject Requests
            <Button 
              variant="primary" 
              size="sm" 
              className="float-end"
              onClick={handleAddNewSubject}
            >
              Add New Subject
            </Button>
          </Card.Title>
          <Table responsive>
            <thead>
              <tr>
                <th>Department</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingCourses && pendingCourses.length > 0 ? (
                pendingCourses.map((course) => (
                  <tr key={course.id || `subject-${Math.random()}`}>
                    <td>{course.department}</td>
                    <td>{course.subjectName}</td>
                    <td>{course.description || '-'}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleCourseAction('view', course.id)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleCourseAction('approve', course.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleCourseAction('reject', course.id)}
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No pending subject requests found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* Add New Subject Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control 
                type="text" 
                name="department"
                value={newSubject.department}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science, Mathematics, Physics"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control 
                type="text" 
                name="subjectName"
                value={newSubject.subjectName}
                onChange={handleInputChange}
                placeholder="e.g., Programming 1, Calculus, Quantum Physics"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                name="description"
                value={newSubject.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Provide a brief description of the subject"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitNewSubject}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Confirmation Modal for Approve/Reject Actions */}
      <Modal show={confirmationModal.show} onHide={() => setConfirmationModal(prev => ({ ...prev, show: false }))}>
        <Modal.Header closeButton>
          <Modal.Title>{confirmationModal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmationModal.message}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setConfirmationModal(prev => ({ ...prev, show: false }))}
          >
            Cancel
          </Button>
          <Button 
            variant={confirmationModal.type === 'approve' ? 'success' : 'danger'} 
            onClick={handleConfirmAction}
            disabled={processing.loading}
          >
            {processing.loading && (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            )}
            {confirmationModal.type === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
