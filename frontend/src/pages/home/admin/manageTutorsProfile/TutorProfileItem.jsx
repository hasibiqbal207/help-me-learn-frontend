import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { updateTutorProfile } from "../../../../core/actionCreators/manageTutorsProfile";

function TutorProfileItem(props) {
  const dispatch = useDispatch();
  const { id, userId, firstName, lastName, gender, status, email } = props.item;
  const navigate = useNavigate();

  const renderStatus = (status) => {
    if (status == "101") return "Approved";
    if (status == "100") return "Pending";
    if (status == "102") return "Rejected";
    return null;
  };

  const handleSubmit = (updatedStatus) => {
    let updatedItem = {
      UserId: userId,
      Status: updatedStatus,
    };

    dispatch(updateTutorProfile(updatedItem));
  };

  const renderActions = (status) => {
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
            onClick={() => navigate(`/tutor/${userId}`)}
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
            onClick={() => navigate(`/tutor/${userId}`)}
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
          onClick={() => navigate(`/tutor/${userId}`)}
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
          <text>{renderStatus(status)}</text>
        </Col>
        <Col>
          <text style={{ fontSize: "32px" }}>{renderActions(status)}</text>
        </Col>
      </Row>
    </div>
  );
}

export default TutorProfileItem;
