import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./login.css";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../core/actionCreators/user";
import { getLoginAlert } from "../../core/selectors/user";

const Login = () => {
  const dispatch = useDispatch();

  const loginAlert = useSelector(getLoginAlert);

  const handleSubmit = (e) => {
    e.preventDefault();
    let elements = e.target.elements;

    dispatch(loginUser(elements.email.value, elements.password.value));
  };

  return (
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
  );
};

export default Login;
