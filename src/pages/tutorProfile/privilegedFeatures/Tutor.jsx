import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Offcanvas, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { Fab, Action } from "react-tiny-fab";
import Avatar from "react-avatar-edit";
import Chat from "../../../components/chat/Chat.jsx";
// import Chat from "../../../components/chat/Chat";
import { saveOfferCourse } from "../../../core/actionCreators/offerCourse";
import { saveQualification } from "../../../core/actionCreators/qualification";
import { uploadProfilePicture } from "../../../core/actionCreators/profilePicture";
import { getCurrentUser } from "../../../core/selectors/user";
import { getOfferCourseSaveAlert } from "../../../core/selectors/offerCourse";
import { getTutorInfoById } from "../../../core/actionCreators/tutor";
import { getTutorInfoDataById } from "../../../core/selectors/tutor";
import { faker } from '@faker-js/faker';
import PendingPosts from "./PendingPosts";

export default function Tutor() {
  const navigate = useNavigate();
  const [showChat, toggleChat] = useState(false);
  const [showEditor, toggleEditor] = useState(false);

  const [showQualificationEditor, toggleQualificationEditor] = useState(false);
  const [showOfferingEditor, toggleOfferingEditor] = useState(false);

  const [pictureFile, setPictureFile] = useState(undefined);
  const [picturePreview, setPicturePreview] = useState(null);
  const [profileAlert, setProfileAlert] = useState(null);
  
  // Form state for age and about
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");

  const currentUser = useSelector(getCurrentUser);
  const tutorInfoDataById = useSelector(getTutorInfoDataById);
  const [tutorInfoData, setTutorInfoData] = useState(null);

  // Get tutor info when component mounts
  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(getTutorInfoById(currentUser.id));
    }
  }, []);

  // Update local state when tutor info changes
  useEffect(() => {
    if (tutorInfoDataById && tutorInfoDataById.length > 0) {
      setTutorInfoData(tutorInfoDataById[0]);
    }
  }, [tutorInfoDataById]);

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
    setProfileAlert(null);
  };

  const editorOpened = () => {
    // When opening editor, set form values to current values
    if (tutorInfoData) {
      setAge(tutorInfoData.age || "");
      setAbout(tutorInfoData.about || "");
    }
    toggleEditor(true);
  };

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
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  // Helper function to get a Faker avatar as a data URL
  const getFakerAvatar = async () => {
    const avatarUrl = faker.image.avatar();
    try {
      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error fetching faker avatar:", error);
      return null;
    }
  };

  const dispatch = useDispatch();
  const onProfileEdit = async () => {
    // Get values from state rather than refs
    const ageValue = age;
    const aboutValue = about;
    
    // Validate about field length
    if (aboutValue && aboutValue.length > 250) {
      setProfileAlert({ 
        type: "danger", 
        message: "About text exceeds the maximum limit of 250 characters." 
      });
      return;
    }
    
    let profilePic = null;
    
    // If user didn't select a picture and there's no existing picture, use faker
    if (!pictureFile && (!tutorInfoData || !tutorInfoData.picPath)) {
      const fakerDataUrl = await getFakerAvatar();
      if (fakerDataUrl) {
        profilePic = dataURLtoFile(fakerDataUrl, "profile.jpg");
      }
    } else if (pictureFile) {
      // User selected a new picture
      profilePic = dataURLtoFile(picturePreview, pictureFile.name);
    }

    if (profilePic || aboutValue || ageValue) {
      console.log("Sending profile update with:", {
        hasFile: !!profilePic,
        userId: currentUser.id,
        about: aboutValue,
        age: ageValue
      });
      
      dispatch(
        uploadProfilePicture({
          profilePicture: profilePic,
          UserId: currentUser.id,
          About: aboutValue || "",
          Age: ageValue || "",
          currentUser: currentUser,
          onSuccess: () => {
            setProfileAlert({ type: "success", message: "Profile updated successfully" });
            // Don't clear the form values after success so user can see the values
            setPicturePreview(null);
            setPictureFile(undefined);
            
            dispatch(getTutorInfoById(currentUser.id));
          },
          onFailure: (errorMessage) => {
            setProfileAlert({ 
              type: "danger", 
              message: errorMessage || "Failed to update profile" 
            });
          }
        })
      );
    } else {
      // Show warning if no fields to update
      setProfileAlert({ type: "warning", message: "Please provide at least one field to update" });
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
            {profileAlert && (
              <Alert variant={profileAlert.type}>
                {profileAlert.message}
              </Alert>
            )}
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
            <Form.Control 
              type="number" 
              placeholder="Age" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <br />
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              maxLength={250}
              isInvalid={about && about.length >= 250}
            />
            <Form.Text className={about && about.length >= 240 ? "text-danger" : "text-muted"}>
              Character count: {about ? about.length : 0}/250
              {about && about.length >= 240 && " (approaching limit)"}
            </Form.Text>
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

    let elements = e.target.elements;

    const qualification = {
      subjectName: elements.subject.value,
      grade: elements.grade.value,
      description: elements.description.value,
      userId: currentUser.id,
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
    e.preventDefault();

    let elements = e.target.elements;

    const offerCourse = {
      subjectName: elements.subject.value,
      language: elements.language.value,
      level: elements.level.value,
      description: elements.description.value,
      ratePerHour: elements.fee.value,
      experinceYears: elements.experience.value,
      availableTime: elements.time.value,
      userId: currentUser.id,
      status: 100, // Changed to 100 (Pending) instead of 101 (Approved)
    };

    dispatch(saveOfferCourse(offerCourse));
    
    // Don't close the editor immediately, let the user see any success/error message
    // The editor can be closed manually after seeing the alert
    toggleOfferingEditor(false);
  };

  function renderOfferingEditor() {
    // Get the save alert from Redux state
    const offerCourseSaveAlert = useSelector(getOfferCourseSaveAlert);
    
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
            {offerCourseSaveAlert && (
              <Alert variant={offerCourseSaveAlert.type}>
                {offerCourseSaveAlert.message}
              </Alert>
            )}
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
    <>
      <PendingPosts />
      {renderChatOption()}
      <Offcanvas
        className="chat-container"
        placement="end"
        show={showChat}
        onHide={chatClosed}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Chat</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Chat />
        </Offcanvas.Body>
      </Offcanvas>
      {renderEditor()}
      {renderQualificationEditor()}
      {renderOfferingEditor()}
    </>
  );
}
