var multer = require("multer");
const util = require("util");

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
module.exports = uploadImageMiddleware;
