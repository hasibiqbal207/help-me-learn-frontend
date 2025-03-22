import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData } from "../../../core/actionCreators/dashboard";
import { getDashboardData } from "../../../core/selectors/dashboard";
import { fetchTutorsProfileList } from "../../../core/actionCreators/manageTutorsProfile";
import { getTutorsProfileList } from "../../../core/selectors/manageTutorsProfile";
import { fetchCourseListByStatus } from "../../../core/actionCreators/course";

export default function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pendingTutors, setPendingTutors] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);

  useEffect(() => {
    dispatch(fetchDashboardData());
    
    // Fetch pending tutors (status 100)
    dispatch(fetchTutorsProfileList({ filters: { status: "100" } }));
    
    // Fetch pending courses (status 100)
    dispatch(fetchCourseListByStatus("100"));
  }, []);

  // Get data from the redux store
  const data = useSelector(getDashboardData);
  const tutorsData = useSelector(getTutorsProfileList);
  const coursesData = useSelector(state => state.course?.data || []);

  useEffect(() => {
    if (tutorsData) {
      setPendingTutors(tutorsData);
    }
  }, [tutorsData]);

  useEffect(() => {
    if (coursesData) {
      setPendingCourses(coursesData);
    }
  }, [coursesData]);

  let usersByStatus = [
    { name: "Approved", value: 0, color: "#0088FE" },
    { name: "Rejected", value: 0, color: "#FF0000" },
    { name: "Pending", value: 0, color: "#FFBB28" },
  ];

  let postsByStatus = [
    { name: "Approved", value: 0, color: "#0088FE" },
    { name: "Rejected", value: 0, color: "#FF0000" },
    { name: "Pending", value: 0, color: "#FFBB28" },
  ];

  let usersByType = [
    { name: "Student", value: 0, color: "#FFBB28" },
    { name: "Tutor", value: 0, color: "#00C49F" },
  ];

  if (data) {
    if (data.UsersByStatus) {
      usersByStatus[0].value = data.UsersByStatus[0].value;
      usersByStatus[1].value = data.UsersByStatus[2].value;
      usersByStatus[2].value = data.UsersByStatus[1].value;
    }

    if (data.PostByStatus) {
      postsByStatus[0].value = data.PostByStatus[0].value;
      postsByStatus[1].value = data.PostByStatus[2].value;
      postsByStatus[2].value = data.PostByStatus[1].value;
    }

    if (data.UsersByType) {
      usersByType[0].value = data.UsersByType[0].value;
      usersByType[1].value = data.UsersByType[1].value;
    }
  }

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const onUsersByStatus = (data, index) => {
    let status;
    if (data.name == "Approved") {
      status = "101";
    } else if (data.name == "Rejected") {
      status = "102";
    } else {
      status = "100";
    }
    navigate(`/users?status=${status}`);
  };

  const onUsersByType = (data, index) => {
    let userType;
    if (data.name == "Student") {
      userType = "102";
    } else {
      userType = "101";
    }
    navigate(`/users?userType=${userType}`);
  };

  const onPostsByStatus = (data, index) => {
    let status;
    if (data.name == "Approved") {
      status = "101";
    } else if (data.name == "Rejected") {
      status = "102";
    } else {
      status = "100";
    }
    navigate(`/posts?status=${status}`);
  };

  const renderPieChart = (title, data, onClick) => {
    return (
      <Card body>
        <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            labelLine={false}
            label={renderLabel}
            onClick={onClick}
          >
            {data.map((item, index) => (
              <Cell
                style={{ cursor: "pointer" }}
                key={`cell-${index}`}
                fill={item.color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Card>
    );
  };

  // Handle view, approve, reject actions for tutors
  const handleTutorAction = (action, userId) => {
    // Implement the action handling logic here
    console.log(`Tutor action: ${action} for user ${userId}`);
    
    // Navigate to tutor profile if view action
    if (action === 'view') {
      navigate(`/tutor/${userId}`);
    }
    // For approve/reject, you would typically dispatch an action
    // to update the tutor status
  };

  // Handle view, approve, reject actions for courses
  const handleCourseAction = (action, courseId) => {
    // Implement the action handling logic here
    console.log(`Course action: ${action} for course ${courseId}`);
    
    // For approve/reject, you would typically dispatch an action
    // to update the course status
  };

  // Function to add a new subject
  const handleAddNewSubject = () => {
    // Implement the logic to add a new subject
    console.log("Add new subject clicked");
    // This might open a modal or navigate to a form page
  };

  return (
    <div>
      <h4 className="mb-4 border-bottom pb-2">Dashboard</h4>
      
      {/* Pending Tutor Requests Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Pending Tutor Requests</Card.Title>
          <Table responsive>
            <thead>
              <tr>
                <th>Tutor Name</th>
                <th>Subject Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingTutors.map((tutor) => (
                <tr key={tutor.id}>
                  <td>{tutor.firstName} {tutor.lastName}</td>
                  <td>{tutor.subject || 'Mathematics'}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleTutorAction('view', tutor.userId)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline-success" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleTutorAction('approve', tutor.userId)}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleTutorAction('reject', tutor.userId)}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* Pending Course Requests Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>
            Pending Course Requests
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingCourses.length > 0 ? pendingCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.department || 'Applied Computer Science'}</td>
                  <td>{course.subjectName || 'Programming 1'}</td>
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
              )) : (
                <tr>
                  <td>Applied Computer Science</td>
                  <td>Programming 1</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">View</Button>
                    <Button variant="outline-success" size="sm" className="me-2">Approve</Button>
                    <Button variant="outline-danger" size="sm">Reject</Button>
                  </td>
                </tr>
              )}
              {pendingCourses.length > 0 ? null : (
                <tr>
                  <td>Sociology</td>
                  <td>Sociology 2</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">View</Button>
                    <Button variant="outline-success" size="sm" className="me-2">Approve</Button>
                    <Button variant="outline-danger" size="sm">Reject</Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* Charts Section */}
      <Row>
        <Col md={4} className="d-flex justify-content-start">
          {renderPieChart("Users by Status", usersByStatus, onUsersByStatus)}
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          {renderPieChart("Users by Type", usersByType, onUsersByType)}
        </Col>
        <Col md={4} className="d-flex justify-content-end">
          {renderPieChart("Posts by Status", postsByStatus, onPostsByStatus)}
        </Col>
      </Row>
    </div>
  );
}
