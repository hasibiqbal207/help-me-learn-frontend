import util from "util";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadImage = multer({
  storage: storage,
}).single("file");

let uploadImageMiddleware = util.promisify(uploadImage);

export default { uploadImageMiddleware };
