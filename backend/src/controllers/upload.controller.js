import * as uploadService from "../services/upload.service.js";
import uploadFile from "../utils/upload.js";

export const upload = async (req, res) => {
  try {
    console.log("Starting file upload process");
    await uploadFile.uploadFileMiddleware(req, res);
    console.log("File middleware processed request");

    if (!req.file) {
      console.error("No file received in the request");
      return res.status(400).send({ message: "Please upload a file!" });
    }

    console.log("File received:", req.file.originalname);
    console.log("Request body:", req.body);

    // Use userId from form data if available, otherwise use from JWT token
    const userId = req.body.userId || req.userid;
    console.log("Processing upload for userId:", userId);

    if (!userId) {
      console.error("No user ID found in request");
      return res.status(400).send({ message: "User ID is required" });
    }

    const tutorProfileId = await uploadService.getTutorProfileId(userId);
    console.log("Tutor profile ID resolved:", tutorProfileId);
    
    if (!tutorProfileId) {
      console.error("No tutor profile found for user ID:", userId);
      return res.status(404).send({ message: "Tutor profile not found for user ID: " + userId });
    }

    await uploadService.updateTutorStatus(tutorProfileId);
    console.log("Tutor status updated successfully");

    if (req.file.mimetype === "application/pdf") {
      console.log("Processing PDF upload");
      await handlePdfUpload(req, res, tutorProfileId);
    } else if (isImageFile(req.file.mimetype)) {
      console.log("Processing image upload");
      await handleImageUpload(req, res);
    } else {
      console.error("Unsupported file type:", req.file.mimetype);
      return res.status(400).send({ message: "Unsupported file type" });
    }

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send({
      message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
    });
  }
};

const handlePdfUpload = async (req, res, tutorProfileId) => {
  try {
    console.log("Checking for existing files for tutorProfileId:", tutorProfileId);
    const existingFile = await uploadService.getExistingFile(tutorProfileId);
    console.log("Existing files found:", existingFile.length);

    if (existingFile.length >= 1) {
      console.log("Deleting existing files");
      await uploadService.deleteExistingFile(tutorProfileId);
    }

    const filePath = "resources/static/" + req.file.originalname;
    console.log("File will be stored with path:", filePath);
    
    const fileData = {
      tutorProfileId,
      fileName: req.file.originalname,
      filePath
    };

    console.log("Inserting file data into database:", fileData);
    const insertResult = await uploadService.insertFile(fileData);
    console.log("File database insert result:", insertResult);

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
      filePath,
      fileName: req.file.originalname,
      tutorProfileId,
      insertId: insertResult.insertId
    });
  } catch (error) {
    console.error("Error handling PDF upload:", error);
    throw new Error("Error handling PDF upload: " + error.message);
  }
};

const handleImageUpload = async (req, res) => {
  try {
    const dateTime = getCurrentDateTime();
    const existingImage = await uploadService.getExistingImage(req.userid);

    if (existingImage.length >= 1) {
      await uploadService.deleteExistingImage(req.userid);
    }

    const imageData = {
      imagePath: "resources/static/" + req.file.originalname,
      userId: req.userid,
      dateTime
    };

    await uploadService.insertImage(imageData);

    res.status(200).send({
      message: "Uploaded the image successfully: " + req.file.originalname,
    });
  } catch (error) {
    throw new Error("Error handling image upload: " + error.message);
  }
};

const isImageFile = (mimetype) => {
  return ["image/jpg", "image/jpeg", "image/png"].includes(mimetype);
};

const getCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + ' ' + time;
};

