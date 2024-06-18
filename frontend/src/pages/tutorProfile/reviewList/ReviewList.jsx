import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getTutorReviewDataById } from "../../../core/selectors/tutor";
import { getTutorReviewById } from "../../../core/actionCreators/tutor";
import { setTutorReview } from "../../../core/actionCreators/tutor";
import { saveReview } from "../../../core/actionCreators/tutor";
import { ListGroup, Row, Col, Button, Form } from "react-bootstrap";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { getCurrentUser, getUserType } from "../../../core/selectors/user";

export default function ReviewList(props) {
  const dispatch = useDispatch();

  let starCountRef = useRef(null);
  const textReviewRef = useRef(null);
  const user = useSelector(getCurrentUser);
  const userType = useSelector(getUserType);

  let { tutorId } = useParams();
  if (props.tutorId !== undefined && props.tutorId != "") {
    tutorId = props.tutorId;
  }
  const tutorReviewData = useSelector(getTutorReviewDataById);
  const [tutorReviews, setTutorReview] = useState([]);

  useEffect(() => {
    dispatch(getTutorReviewById(tutorId));
  }, []);
  useEffect(() => {
    setTutorReview(tutorReviewData);
  }, [tutorReviewData]);

  const submitReview = () => {
    let review = {
      Rating: starCountRef.current.state.value,
      Text: textReviewRef.current.value,
      UserId: user.id,
      TutorProfileId: Number(tutorId),
    };
    dispatch(saveReview(review));
  };

  const renderReview = () => {
    if (userType !== "student") return null;

    return (
      <div>
        <Row>
          <span>YOUR REVIEW</span>
          <Rate
            defaultValue={2.5}
            ref={starCountRef}
            allowHalf
            allowClear={false}
          />
          <Col sm={11}>
            <Form.Control size="md" ref={textReviewRef} type="text" />
          </Col>
          <Col sm={1}>
            <Button
              className="float-end"
              variant="primary"
              size="md"
              onClick={submitReview}
              type="submit"
            >
              Submit
            </Button>
          </Col>
        </Row>
        <br />
      </div>
    );
  };

  const renderReviews = () => {
    if (
      tutorReviews === undefined ||
      tutorReviews.length === undefined ||
      tutorReviews.length === 0
    ) {
      return null;
    }

    return (
      <div>
        <span>REVIEWS</span>
        <ListGroup style={{ padding: "1.0rem 0 0 0" }}>
          {tutorReviewData?.map((item, i) => {
            return (
              <ListGroup.Item
                key={i}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="me-auto">
                  <div className="fw-bold">{`${item.firstName} ${item.lastName}`}</div>
                  <div>
                    <Rate defaultValue={item.rating} disabled />
                    <span className="text-muted">{item.modifiedDateTime}</span>
                  </div>
                  <div className="fw-light">{item.text}</div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    );
  };

  return (
    <div>
      {renderReview()}
      {renderReviews()}
    </div>
  );
}
