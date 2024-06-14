import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { updateUser } from "../../../../core/actionCreators/manageUsers";

function UserItem(props) {
  const dispatch = useDispatch();
  const { id, firstName, lastName, gender, status, email, usertype } =
    props.item;
  const navigate = useNavigate();

  const renderUserType = (userType) => {
    if (userType == "101") return "Tutor";
    if (userType == "100") return "Admin";
    if (userType == "102") return "Student";
    return null;
  };

  const handleSubmit = (updatedStatus) => {
    let updatedItem = {
      Id: id,
      FirstName: firstName,
      LastName: lastName,
      UserType: usertype,
      Email: email,
      Status: updatedStatus,
      Gender: gender,
    };
    dispatch(updateUser(updatedItem));
  };

  const renderActions = (userType, status) => {
    if (userType != "101") return null;

    // Rejected
    if (status == "102") {
      return (
        <div>
          <i
            style={{ cursor: "pointer" }}
            onClick={() => handleSubmit("101")}
            className="bi bi-person-check-fill"
          />
          <i
            style={{ cursor: "pointer", marginLeft: "15px" }}
            onClick={() => navigate(`/tutor/${id}`)}
            className="bi bi-eye-fill"
          />
        </div>
      );
    }
    // Approved
    if (status == "101")
      return (
        <div>
          <i
            style={{ cursor: "pointer" }}
            onClick={() => handleSubmit("102")}
            className="bi bi-person-x-fill"
          />
          <i
            style={{ cursor: "pointer", marginLeft: "15px" }}
            onClick={() => navigate(`/tutor/${id}`)}
            className="bi bi-eye-fill"
          />
        </div>
      );

    // Pending
    return (
      <div>
        <i
          style={{ cursor: "pointer" }}
          onClick={() => handleSubmit("101")}
          className="bi bi-person-check-fill"
        />{" "}
        <i
          style={{ cursor: "pointer" }}
          onClick={() => handleSubmit("102")}
          className="bi bi-person-x-fill"
        />
        <i
          style={{ cursor: "pointer", marginLeft: "15px" }}
          onClick={() => navigate(`/tutor/${id}`)}
          className="bi bi-eye-fill"
        />
      </div>
    );
  };
  return (
    <div
      style={{ borderColor: "#808080" }}
      className="container-lg p-3 border-top border-start border-end border-1 rounded"
    >
      <Row>
        <Col>
          <span style={{ fontWeight: "bold" }}>
            {firstName} {lastName}
          </span>
        </Col>
        <Col>
          <span className="text-muted">{email}</span>
        </Col>
        <Col>
          <span>{gender}</span>
        </Col>
        <Col>
          <text>{renderUserType(usertype)}</text>
        </Col>
        <Col>
          <text style={{ fontSize: "32px" }}>
            {renderActions(usertype, status)}
          </text>
        </Col>
      </Row>
    </div>
  );
}

export default UserItem;
