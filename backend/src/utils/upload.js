import util from "util";
import multer from "multer";
import path from "path";
import fs from "fs";

const maxSize = 2 * 1024 * 1024;

// Ensure the upload directory exists
const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    console.log(`Creating directory: ${directory}`);
    fs.mkdirSync(directory, { recursive: true });
  }
};

const getUploadPath = () => {
  const uploadPath = path.join(__basedir, "/resources/static/");
  ensureDirectoryExists(uploadPath);
  console.log(`Upload path set to: ${uploadPath}`);
  return uploadPath;
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = getUploadPath();
    console.log(`Storing file in: ${uploadPath}`);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    console.log(`Storing file with name: ${file.originalname}`);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

export default { uploadFileMiddleware };
