import React, { useState, useEffect } from "react";
import { Card, Table, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchTutorsProfileList } from "../../../core/actionCreators/manageTutorsProfile";
import { getTutorsProfileList } from "../../../core/selectors/manageTutorsProfile";
import { FaSearch, FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import { tutorsApi, allTutorListApi, usersApi } from "../../../core/endpoints";

export default function TutorsList() {
  const dispatch = useDispatch();
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // For tutor view modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  
  // For delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tutorToDelete, setTutorToDelete] = useState(null);

  // Direct API fetch as a fallback
  const fetchTutorsDirectly = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the users API with the correct parameter case
      const response = await axios.get(`${usersApi}?userType=101`);
      console.log("API Response:", response.data);
      
      if (response.data && Array.isArray(response.data)) {
        if (response.data.length > 0) {
          setTutors(response.data);
        } else {
          setError("No tutors found in the system");
        }
      } else {
        setError("Invalid data format received from API");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tutors directly:", err);
      setError(`Failed to load tutors: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Skip the Redux action and go straight to direct API fetch
    fetchTutorsDirectly();
    
    // No need for the timeout anymore
    // dispatch(fetchTutorsProfileList({
    //   filters: {} // Don't filter by status since we want all tutors
    // }));
    
    // const timer = setTimeout(() => {
    //   fetchTutorsDirectly();
    // }, 2000);
    
    // return () => clearTimeout(timer);
  }, []);

  // Get data from the redux store
  const tutorsData = useSelector(getTutorsProfileList);

  useEffect(() => {
    if (tutorsData && tutorsData.length > 0) {
      console.log("Tutors data from Redux:", tutorsData);
      setTutors(tutorsData);
      setLoading(false);
    }
  }, [tutorsData]);

  // Filter tutors based on search query for name and subject only
  const filteredTutors = tutors.filter(tutor => {
    // Safety check for null values
    const firstName = tutor.firstName || '';
    const lastName = tutor.lastName || '';
    const subject = tutor.subject || '';
    const email = tutor.email || '';
    
    // Check if the tutor matches the search query
    return searchQuery === "" || 
      `${firstName} ${lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Debug log
  useEffect(() => {
    console.log("Current tutors state:", tutors);
  }, [tutors]);

  // Handle view tutor
  const handleViewTutor = (tutor) => {
    setSelectedTutor(tutor);
    setShowViewModal(true);
  };

  // Handle delete tutor confirmation
  const handleDeleteConfirm = (tutor) => {
    setTutorToDelete(tutor);
    setShowDeleteModal(true);
  };

  // Handle actual delete tutor
  const handleDeleteTutor = async () => {
    try {
      // Use the appropriate ID field
      const tutorId = tutorToDelete.id || tutorToDelete.userId;
      await axios.delete(`${usersApi}/${tutorId}`);
      // Refresh the tutor list after deletion
      fetchTutorsDirectly();
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting tutor:", err);
      setError(`Failed to delete tutor: ${err.message}`);
      setShowDeleteModal(false);
    }
  };

  return (
    <div>
      <h4 className="mb-4 border-bottom pb-2">Tutor List</h4>

      {/* Search Bar Only */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-end mb-3">
            <InputGroup style={{ width: '300px' }}>
              <Form.Control
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </div>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          {loading ? (
            <div className="text-center my-4">Loading tutors...</div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTutors.length > 0 ? (
                  filteredTutors.map((tutor) => (
                    <tr key={tutor.id || tutor.userId || Math.random().toString()}>
                      <td>{tutor.firstName || ''} {tutor.lastName || ''}</td>
                      <td>{tutor.email || 'N/A'}</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleViewTutor(tutor)}
                        >
                          <FaEye className="me-1" /> View
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDeleteConfirm(tutor)}
                        >
                          <FaTrash className="me-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No tutors found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* View Tutor Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tutor Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTutor && (
            <div>
              <h5>{selectedTutor.firstName || ''} {selectedTutor.lastName || ''}</h5>
              <p><strong>Email:</strong> {selectedTutor.email || 'Not specified'}</p>
              {selectedTutor.gender && <p><strong>Gender:</strong> {selectedTutor.gender}</p>}
              {selectedTutor.phone && <p><strong>Phone:</strong> {selectedTutor.phone}</p>}
              {selectedTutor.subject && <p><strong>Subject:</strong> {selectedTutor.subject}</p>}
              {selectedTutor.about && <p><strong>About:</strong> {selectedTutor.about}</p>}
              {selectedTutor.experience && <p><strong>Experience:</strong> {selectedTutor.experience}</p>}
              {selectedTutor.usertype && <p><strong>User Type:</strong> {selectedTutor.usertype === "101" ? "Tutor" : selectedTutor.usertype}</p>}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the tutor: {tutorToDelete && `${tutorToDelete.firstName} ${tutorToDelete.lastName}`}?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteTutor}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} 