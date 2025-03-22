import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getTutorReviewDataById } from "../../../core/selectors/tutor";
import { getTutorReviewById } from "../../../core/actionCreators/tutor";
import { setTutorReview } from "../../../core/actionCreators/tutor";
import { saveReview } from "../../../core/actionCreators/tutor";
import { ListGroup, Row, Col, Button, Form, Alert } from "react-bootstrap";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { getCurrentUser, getUserType } from "../../../core/selectors/user";

export default function ReviewList(props) {
  const dispatch = useDispatch();

  let starCountRef = useRef(null);
  const textReviewRef = useRef(null);
  const user = useSelector(getCurrentUser);
  const userType = useSelector(getUserType);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState("info");

  let { tutorId } = useParams();
  if (props.tutorId !== undefined && props.tutorId != "") {
    tutorId = props.tutorId;
  }
  const tutorReviewData = useSelector(getTutorReviewDataById);
  const [tutorReviews, setTutorReview] = useState([]);

  // Add state for rating
  const [rating, setRating] = useState(2.5);

  useEffect(() => {
    dispatch(getTutorReviewById(tutorId));
  }, []);

  useEffect(() => {
    setTutorReview(tutorReviewData);
  }, [tutorReviewData]);

  // Ensure starCountRef has a properly initialized state
  useEffect(() => {
    if (starCountRef.current && !starCountRef.current.state) {
      starCountRef.current.state = { value: rating };
    }
  }, [starCountRef, rating]);

  const submitReview = () => {
    console.log('Submit review called');
    console.log('rating:', rating);
    console.log('textReviewRef:', textReviewRef.current);
    console.log('user:', user);
    console.log('tutorId:', tutorId);
    
    // Validate inputs
    if (!rating) {
      setFeedbackMessage("Please select a rating");
      setFeedbackType("danger");
      setShowFeedback(true);
      return;
    }
    
    if (!textReviewRef.current || !textReviewRef.current.value || !textReviewRef.current.value.trim()) {
      setFeedbackMessage("Please enter review text");
      setFeedbackType("danger");
      setShowFeedback(true);
      return;
    }
    
    let review = {
      rating: rating,
      text: textReviewRef.current.value,
      userId: user?.id,
      tutorProfileId: Number(tutorId),
    };
    
    // Validate all required fields are present
    if (!review.rating || !review.text || !review.userId || !review.tutorProfileId) {
      setFeedbackMessage("Missing required review information");
      setFeedbackType("danger");
      setShowFeedback(true);
      return;
    }
    
    try {
      dispatch(saveReview(review));
      setFeedbackMessage("Review submitted successfully");
      setFeedbackType("success");
      setShowFeedback(true);
      
      // Clear form
      if (textReviewRef.current) {
        textReviewRef.current.value = "";
      }
      setRating(0); // Reset rating
      
      // Refresh the reviews list
      setTimeout(() => {
        dispatch(getTutorReviewById(tutorId));
      }, 1000);
    } catch (error) {
      setFeedbackMessage("Error submitting review");
      setFeedbackType("danger");
      setShowFeedback(true);
    }
  };

  const renderReview = () => {
    if (userType !== "student") return null;

    return (
      <div>
        <Row>
          <span>YOUR REVIEW</span>
          <Rate
            defaultValue={rating}
            value={rating}
            ref={starCountRef}
            allowHalf
            allowClear={false}
            onChange={(value) => {
              setRating(value);
              if (starCountRef.current) {
                // Ensure state exists and has a value property
                if (!starCountRef.current.state) {
                  starCountRef.current.state = {};
                }
                starCountRef.current.state.value = value;
              }
            }}
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
        {showFeedback && (
          <Alert 
            variant={feedbackType} 
            className="mt-3"
            dismissible
            onClose={() => setShowFeedback(false)}
          >
            {feedbackMessage}
          </Alert>
        )}
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
      return (
        <div>
          <span>REVIEWS</span>
          <Alert variant="info" className="mt-3">
            No reviews available. Be the first to leave a review for this tutor!
          </Alert>
        </div>
      );
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
