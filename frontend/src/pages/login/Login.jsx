import React, { useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import Header from "../../components/header/Header";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../core/actionCreators/user";
import { getLoginAlert, getUserType, isAuthenticated } from "../../core/selectors/user";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userType = useSelector(getUserType);
  const authenticated = useSelector(isAuthenticated);

  const loginAlert = useSelector(getLoginAlert);

  // Handle redirection after successful login
  useEffect(() => {
    if (authenticated) {
      console.log("Login component - Authentication detected, redirecting user type:", userType);
      // All user types now go to home, the navbar will show different options
      navigate("/home");
    }
  }, [authenticated, userType, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let elements = e.target.elements;
    
    console.log("Login form submitted", elements.email.value);
    dispatch(loginUser(elements.email.value, elements.password.value));
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-content">
          {loginAlert && (
            <Alert variant={loginAlert.type}>{loginAlert.message}</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Control
              className="mt-3"
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />
            <Form.Control
              className="mt-2"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <Button className="mt-4 login-button" variant="primary" type="submit">
              Login
            </Button>

            <NavLink to="/registration">
              <Button className="login-button" variant="link" type="submit">
                Register
              </Button>
            </NavLink>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
