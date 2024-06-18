import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFilePicker } from "use-file-picker";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ListGroup, Badge, Button, Row, Col } from "react-bootstrap";
import { getUserType } from "../../../core/selectors/user";
import { getTutorFiles } from "../../../core/selectors/tutor";
import { fetchTutorFiles } from "../../../core/actionCreators/tutor";
import { uploadFile } from "../../../core/actionCreators/fileUpload";
import { filesApi } from "../../../core/endpoints";

export default function FileList(props) {
  const dispatch = useDispatch();
  let { tutorId } = useParams();
  if (props.tutorId !== undefined && props.tutorId != "") {
    tutorId = props.tutorId;
  }
  const tutorFilesData = useSelector(getTutorFiles);
  const userType = useSelector(getUserType);
  const [tutorFiles, setTutorFiles] = useState([]);
  useEffect(() => {
    dispatch(fetchTutorFiles(tutorId));
  }, []);
  useEffect(() => {
    setTutorFiles(tutorFilesData);
  }, [tutorFilesData]);

  const [
    openFileSelector,
    { filesContent, loading, errors, plainFiles, clear },
  ] = useFilePicker({
    multiple: true,
    readAs: "DataURL",
    accept: [".pdf"],
    limitFilesConfig: { min: 1, max: 1 },
  });

  const submitFile = (e) => {
    dispatch(uploadFile(e));
  };

  if (
    tutorFiles === undefined ||
    tutorFiles.length === undefined ||
    tutorFiles.length === 0
  ) {
    return null;
  }

  const renderUploadFiles = () => {
    if (userType === "tutor") {
      return (
        <div>
          <span>UPLOAD FILES</span>
          <div>
            <button
              className="btn btn-group-sm btn-info"
              style={{ marginRight: "5px" }}
              onClick={() => openFileSelector()}
            >
              {" "}
              Select file{" "}
            </button>
            <button
              className="btn btn-group-sm btn-success"
              style={{ marginRight: "5px" }}
              onClick={() => submitFile(plainFiles[0])}
            >
              {" "}
              Upload{" "}
            </button>
            <button
              className="btn btn-group-sm btn-danger"
              style={{ marginRight: "5px" }}
              onClick={() => clear()}
            >
              {" "}
              Clear{" "}
            </button>
            Name of selected file:
            {plainFiles.length}
            {plainFiles.map((file) => (
              <div key={file.name}>{file.name}</div>
            ))}
          </div>
          <br />
        </div>
      );
    }
  };

  return (
    <div>
      {renderUploadFiles()}
      <div>
        <span>MY FILES</span>
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
