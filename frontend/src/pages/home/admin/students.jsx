import React, { useState, useEffect } from "react";
import { Card, Table, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import { allStudentListApi, usersApi } from "../../../core/endpoints";

export default function StudentsList() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // For student view modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // For delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Fetch students from API
  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use the users API with the correct parameter case
      const response = await axios.get(`${usersApi}?userType=102`);
      console.log("API Response for students:", response.data);
      
      if (response.data && Array.isArray(response.data)) {
        if (response.data.length > 0) {
          setStudents(response.data);
        } else {
          setError("No students found in the system");
        }
      } else {
        setError("Invalid data format received from API");
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(`Failed to load students: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students based on search query for name and email only
  const filteredStudents = students.filter(student => {
    return searchQuery === "" || 
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.email && student.email.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  // Handle view student
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  // Handle delete student confirmation
  const handleDeleteConfirm = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  // Handle actual delete student
  const handleDeleteStudent = async () => {
    try {
      // Use the appropriate ID field
      const studentId = studentToDelete.id || studentToDelete.userId;
      await axios.delete(`${usersApi}/${studentId}`);
      // Refresh the student list after deletion
      fetchStudents();
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting student:", err);
      setError(`Failed to delete student: ${err.message}`);
      setShowDeleteModal(false);
    }
  };

  return (
    <div>
      <h4 className="mb-4 border-bottom pb-2">Student List</h4>

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
            <div className="text-center my-4">Loading students...</div>
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
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.firstName} {student.lastName}</td>
                      <td>{student.email}</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleViewStudent(student)}
                        >
                          <FaEye className="me-1" /> View
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDeleteConfirm(student)}
                        >
                          <FaTrash className="me-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No students found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* View Student Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Student Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <div>
              <h5>{selectedStudent.firstName} {selectedStudent.lastName}</h5>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              {selectedStudent.phone && <p><strong>Phone:</strong> {selectedStudent.phone}</p>}
              {selectedStudent.gender && <p><strong>Gender:</strong> {selectedStudent.gender}</p>}
              {selectedStudent.dateOfBirth && <p><strong>Date of Birth:</strong> {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>}
              {selectedStudent.address && <p><strong>Address:</strong> {selectedStudent.address}</p>}
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
          Are you sure you want to delete the student: {studentToDelete && `${studentToDelete.firstName} ${studentToDelete.lastName}`}?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteStudent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} 