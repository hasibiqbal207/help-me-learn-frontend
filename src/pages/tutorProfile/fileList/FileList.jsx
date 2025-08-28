import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFilePicker } from "use-file-picker";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ListGroup, Badge, Button, Row, Col, Alert } from "react-bootstrap";
import { getUserType, getCurrentUser } from "../../../core/selectors/user";
import { getTutorFiles } from "../../../core/selectors/tutor";
import { fetchTutorFiles } from "../../../core/actionCreators/tutor";
import { uploadFile } from "../../../core/actionCreators/fileUpload";
import { filesApi } from "../../../core/endpoints";

export default function FileList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(getCurrentUser);
  let { tutorId } = useParams();
  
  // If no tutorId is provided in props or URL params, use the current user's ID
  if (props.tutorId !== undefined && props.tutorId !== "") {
    tutorId = props.tutorId;
  } else if (!tutorId && currentUser) {
    tutorId = currentUser.id;
  }
  
  const tutorFilesData = useSelector(getTutorFiles);
  const userType = useSelector(getUserType);
  const [tutorFiles, setTutorFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [error, setError] = useState(null);
  
  // Check if user is authenticated and is a tutor
  const isAuthenticated = !!currentUser;
  const isTutor = userType === "tutor";

  useEffect(() => {
    if (tutorId) {
      console.log("Fetching files for tutorId:", tutorId);
      dispatch(fetchTutorFiles(tutorId));
    } else {
      console.warn("No tutorId available to fetch files");
      setError("No tutor ID available. Please log in as a tutor.");
    }
  }, [tutorId, dispatch]);

  useEffect(() => {
    if (tutorFilesData) {
      console.log("Received tutor files data:", tutorFilesData);
      setTutorFiles(tutorFilesData);
    }
  }, [tutorFilesData]);

  const [
    openFileSelector,
    { filesContent, loading, errors, plainFiles, clear },
  ] = useFilePicker({
    multiple: false,
    readAs: "DataURL",
    accept: [".pdf"],
    limitFilesConfig: { min: 1, max: 1 },
  });

  const submitFile = (e) => {
    // Check if user is authenticated and is a tutor
    if (!isAuthenticated) {
      setError("You need to be logged in to upload files.");
      setUploadSuccess(false);
      return;
    }
    
    if (!isTutor) {
      setError("Only tutors can upload files.");
      setUploadSuccess(false);
      return;
    }

    if (!e || !e.name) {
      console.error("No file selected");
      setError("Please select a file first.");
      setUploadSuccess(false);
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      // Pass the file object directly to the action creator
      dispatch(uploadFile(e));
      console.log("File submitted for upload:", e.name);
      setUploadSuccess(true);
      
      // The file list refresh is now handled in the saga after successful upload
      setTimeout(() => {
        setIsUploading(false);
      }, 2000);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file: " + (error.message || "Unknown error"));
      setUploadSuccess(false);
      setIsUploading(false);
    }
  };

  const renderUploadFiles = () => {
    // Only tutors should be able to upload files
    if (userType === "tutor") {
      return (
        <div>
          <span className="d-block mb-2 fw-bold">UPLOAD FILES</span>
          <div className="mb-3">
            <button
              className="btn btn-sm btn-info"
              style={{ marginRight: "5px" }}
              onClick={() => {
                setUploadSuccess(null);
                setError(null);
                openFileSelector();
              }}
              disabled={isUploading}
            >
              Select file
            </button>
            <button
              className="btn btn-sm btn-success"
              style={{ marginRight: "5px" }}
              onClick={() => submitFile(plainFiles[0])}
              disabled={!plainFiles.length || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
            <button
              className="btn btn-sm btn-danger"
              style={{ marginRight: "5px" }}
              onClick={() => {
                clear();
                setUploadSuccess(null);
                setError(null);
              }}
              disabled={!plainFiles.length || isUploading}
            >
              Clear
            </button>
            {uploadSuccess === true && (
              <Alert variant="success" className="mt-2 p-2">
                File uploaded successfully!
              </Alert>
            )}
            {uploadSuccess === false && (
              <Alert variant="danger" className="mt-2 p-2">
                Failed to upload file. {error && <span>{error}</span>}
              </Alert>
            )}
            {error && uploadSuccess !== false && (
              <Alert variant="warning" className="mt-2 p-2">
                {error}
              </Alert>
            )}
            {plainFiles.length > 0 && (
              <div className="mt-2">
                <strong>Selected file:</strong> {plainFiles[0].name}
              </div>
            )}
          </div>
        </div>
      );
    } else if (!isAuthenticated) {
      return (
        <div className="mb-3">
          <Alert variant="info">
            You need to <Link to="/login">log in</Link> as a tutor to upload files.
          </Alert>
        </div>
      );
    } else if (!isTutor) {
      return (
        <div className="mb-3">
          <Alert variant="info">
            Only tutors can upload files.
          </Alert>
        </div>
      );
    }
    return null;
  };

  if (
    tutorFiles === undefined ||
    tutorFiles.length === undefined ||
    tutorFiles.length === 0
  ) {
    return (
      <div>
        {renderUploadFiles()}
        <div>
          <span className="d-block mb-2 fw-bold">MY FILES</span>
          <Alert variant="info" className="mt-3">
            No files available. This tutor has not uploaded any files yet.
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderUploadFiles()}
      <div>
        <span className="d-block mb-2 fw-bold">MY FILES</span>
        <ListGroup style={{ padding: "1.0rem 0 0 0" }}>
          {tutorFiles.map((item, i) => {
            return (
              <ListGroup.Item
                key={i}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{item.fileName}</div>
                </div>
                <Badge bg="primary" pill>
                  <a
                    style={{ color: "#FFFFFF" }}
                    target="_blank"
                    href={`${filesApi}/${item.filePath}`}
                  >
                    Download
                  </a>
                </Badge>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </div>
  );
}
