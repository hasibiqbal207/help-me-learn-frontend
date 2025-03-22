import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../../components/header/Header";
import {
  registerUser,
  setRegistrationAlert,
} from "../../core/actionCreators/user";
import { getRegistrationAlert } from "../../core/selectors/user";
import "./registration.css";

function Registration(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {};
    [...e.target.elements].forEach((element) => {
      let name = element.name;
      if (name !== undefined && name !== "") {
        let value = element.value;
        data[name] = value;
      }
    });

    let errorMessage = undefined;
    if (data["email"] === undefined)
      errorMessage = "Please provide an email address.";

    if (data["gender"] === undefined || data["gender"] === "-1")
      errorMessage = "Gender not selected.";

    if (data["userType"] === undefined || data["userType"] === "-1")
      errorMessage = "User type not selected.";

    if (data["password"] != data["confirmPassword"])
      errorMessage = "Confirm password does not match";

    if (errorMessage !== undefined) {
      dispatch(setRegistrationAlert(errorMessage));
    } else {
      // Always approved
      data["status"] = 101;
      
      // Make sure userType is sent as a number
      data["userType"] = parseInt(data["userType"]);

      data["confirmPassword"] = undefined;
      console.log("Submitting registration data:", data);
      dispatch(registerUser({ data, navigate }));
    }
  };

  const registrationAlert = useSelector(getRegistrationAlert);

  return (
    <>
      <Header />
      <div className="registration-page">
        <div className="registration-content">
          <img src="logo512.png" className="registration-logo" alt="logo" />
          {registrationAlert && (
            <Alert variant={registrationAlert.type}>
              {registrationAlert.message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Control
              className="mt-2"
              type="text"
              name="firstName"
              placeholder="First Name"
              required
            />
            <Form.Control
              className="mt-2"
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
            />
            <Form.Control
              className="mt-2"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <Form.Control
              className="mt-2"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <Form.Control
              className="mt-2"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
            <div>
              <Row>
                <Col>
                  <Form.Select name="gender" className="mt-2">
                    <option value="-1">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select name="userType" className="mt-2">
                    <option value="-1">Select User Type</option>
                    <option value="101">Tutor</option>
                    <option value="102">Student</option>
                  </Form.Select>
                </Col>
              </Row>
            </div>

            <Button
              className="mt-4 registration-button"
              variant="primary"
              type="submit"
            >
              Register
            </Button>
            <NavLink to="/login">
              <Button className="registration-button" variant="link">
                Login
              </Button>
            </NavLink>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Registration;
