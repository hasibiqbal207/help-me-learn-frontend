import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Offcanvas, Row, Col, Button, Form } from "react-bootstrap";
import { Fab, Action } from "react-tiny-fab";
import Avatar from "react-avatar-edit";
import Chat from "../../../components/chat/Chat";
import { saveOfferCourse } from "../../../core/actionCreators/offerCourse";
import { saveQualification } from "../../../core/actionCreators/qualification";
import { uploadProfilePicture } from "../../../core/actionCreators/profilePicture";
import { getCurrentUser } from "../../../core/selectors/user";

export default function Tutor() {
  const navigate = useNavigate();
  const [showChat, toggleChat] = useState(false);
  const [showEditor, toggleEditor] = useState(false);

  const [showQualificationEditor, toggleQualificationEditor] = useState(false);
  const [showOfferingEditor, toggleOfferingEditor] = useState(false);

  const [pictureFile, setPictureFile] = useState(undefined);
  const [picturePreview, setPicturePreview] = useState(null);

  const currentUser = useSelector(getCurrentUser);

  const qualificationEditorClosed = () => {
    toggleQualificationEditor(false);
  };

  const qualificationEditorOpened = () => {
    toggleQualificationEditor(true);
  };

  const offeringEditorClosed = () => {
    toggleOfferingEditor(false);
  };

  const offeringEditorOpened = () => {
    toggleOfferingEditor(true);
  };

  const editorClosed = () => {
    toggleEditor(false);
    setPicturePreview(null);
  };

  const editorOpened = () => toggleEditor(true);

  const ageRef = useRef(null);
  const aboutRef = useRef(null);

  const chatClosed = () => toggleChat(false);
  const chatOpened = () => toggleChat(true);

  const onClose = () => {
    setPicturePreview(null);
  };

  const onCrop = (preview) => {
    setPicturePreview(preview);
  };

  const onBeforeFileLoad = (e) => {
    /*if(e.target.files[0].size > 71680){
    };*/
  };

  const onFileLoad = (file) => {
    setPictureFile(file);
  };

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const dispatch = useDispatch();
  const onProfileEdit = () => {
    if (pictureFile || aboutRef.current.value || ageRef.current.value) {
      dispatch(
        uploadProfilePicture({
          profilePicture: pictureFile
            ? dataURLtoFile(picturePreview, pictureFile.name)
            : null,
          UserId: currentUser.id,
          About: aboutRef.current.value,
          Age: ageRef.current.value,
        })
      );
    }
  };

  function renderChatOption() {
    return (
      <Fab alwaysShowTitle={true} icon={<i className="bi bi-plus"></i>}>
        <Action
          onClick={qualificationEditorOpened}
          style={{ backgroundColor: "#0D6EFD" }}
          text="Add Qualification"
        >
          <i className="bi bi-journal-medical" />
        </Action>
        <Action
          onClick={offeringEditorOpened}
          style={{ backgroundColor: "#0D6EFD" }}
          text="Offer Course"
        >
          <i className="bi bi-person-workspace" />
        </Action>
        <Action
          onClick={chatOpened}
          style={{ backgroundColor: "#0D6EFD" }}
          text="Chat"
        >
          <i className="bi bi-chat-dots" />
        </Action>
        <Action
          onClick={editorOpened}
          style={{ backgroundColor: "#0D6EFD" }}
          text="Edit Profile"
        >
          <i className="bi bi-person-circle" />
        </Action>
      </Fab>
    );
  }

  function renderEditor() {
    return (
      <Offcanvas
        style={{ width: "35%", zIndex: 9999 /** to overlay fab button */ }}
        placement="end"
        show={showEditor}
        onHide={editorClosed}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Row>
              <Col>
                <Avatar
                  width={192}
                  height={192}
                  imageHeight={192}
                  onCrop={onCrop}
                  onClose={onClose}
                  onBeforeFileLoad={onBeforeFileLoad}
                  onFileLoad={onFileLoad}
                />
              </Col>
              <Col>
                <img src={picturePreview} alt="Preview" />
              </Col>
            </Row>
            <br />
            <Form.Control ref={ageRef} placeholder="Age" type="number" />
            <br />
            <Form.Control
              ref={aboutRef}
              placeholder="About"
              as="textarea"
              rows={3}
            />
            <br />
            <div>
              <Button
                style={{ float: "right" }}
                onClick={onProfileEdit}
                type="submit"
              >
                {" "}
                Update
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  const onQualificationSubmitted = (e) => {
    //...
    e.preventDefault();

    var elements = e.target.elements;

    const qualification = {
      SubjectName: elements.subject.value,
      Grade: elements.grade.value,
      Description: elements.description.value,
      UserId: currentUser.id,
    };

    dispatch(saveQualification(qualification));
  };

  function renderQualificationEditor() {
    return (
      <Offcanvas
        style={{ width: "35%", zIndex: 9999 /** to overlay fab button */ }}
        placement="end"
        show={showQualificationEditor}
        onHide={qualificationEditorClosed}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Qualification</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Form onSubmit={onQualificationSubmitted}>
              <Form.Control
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <br />
              <Form.Control
                type="text"
                name="grade"
                placeholder="Grade"
                required
              />
              <br />
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                placeholder="Description"
                required
              />
              <br />
              <Button
                style={{ float: "right" }}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  const onOfferingSubmitted = (e) => {
    //...
    e.preventDefault();

    var elements = e.target.elements;

    const offerCourse = {
      SubjectName: elements.subject.value,
      Language: elements.language.value,
      Level: elements.level.value,
      Description: elements.description.value,
      RatePerHour: elements.fee.value,
      ExperinceYears: elements.experience.value,
      AvailableTime: elements.time.value,
      UserId: currentUser.id,
      Status: 101, //Approved
    };

    dispatch(saveOfferCourse(offerCourse));
  };

  function renderOfferingEditor() {
    return (
      <Offcanvas
        style={{ width: "35%", zIndex: 9999 /** to overlay fab button */ }}
        placement="end"
        show={showOfferingEditor}
        onHide={offeringEditorClosed}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Course Offering</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Form onSubmit={onOfferingSubmitted}>
              <Form.Control
                type="text"
                placeholder="Subject"
                name="subject"
                required
              />
              <br />
              <Form.Control
                type="text"
                name="language"
                placeholder="Language of Instruction"
                required
              />
              <br />
              <Form.Select size="sm" name="level" defaultValue="Undergraduate">
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
              </Form.Select>
              <br />
              <Form.Control
                name="fee"
                type="number"
                placeholder="Per Hour Fee"
                required
              />
              <br />
              <Form.Control
                type="number"
                name="experience"
                placeholder="Years of Experience"
                required
              />
              <br />
              <Form.Control
                name="time"
                type="text"
                placeholder="Available Time"
                required
              />
              <br />
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Description"
                required
              />
              <br />
              <Button
                style={{ float: "right" }}
                variant="primary"
                type="submit"
              >
                Request for Approval
              </Button>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  return (
    <div>
      {renderChatOption()}
      <Chat showChat={showChat} chatClosed={chatClosed} />
      {renderEditor()}
      {renderQualificationEditor()}
      {renderOfferingEditor()}
    </div>
  );
}
