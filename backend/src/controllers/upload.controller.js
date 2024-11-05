import * as uploadService from "../services/upload.service.js";
import uploadFile from "../utils/upload.js";

export const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const tutorProfileId = await uploadService.getTutorProfileId(req.userid);
    if (!tutorProfileId) {
      return res.status(404).send({ message: "Tutor profile not found" });
    }

    await uploadService.updateTutorStatus(tutorProfileId);

    if (req.file.mimetype === "application/pdf") {
      await handlePdfUpload(req, res, tutorProfileId);
    } else if (isImageFile(req.file.mimetype)) {
      await handleImageUpload(req, res);
    } else {
      return res.status(400).send({ message: "Unsupported file type" });
    }

  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
    });
  }
};

const handlePdfUpload = async (req, res, tutorProfileId) => {
  try {
    const existingFile = await uploadService.getExistingFile(tutorProfileId);

    if (existingFile.length >= 1) {
      await uploadService.deleteExistingFile(tutorProfileId);
    }

    const fileData = {
      tutorProfileId,
      fileName: req.file.originalname,
      filePath: "resources/static/" + req.file.originalname
    };

    await uploadService.insertFile(fileData);

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (error) {
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

