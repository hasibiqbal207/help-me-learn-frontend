
// Delete User
let adminController = require("../controller/adminController");
router.delete("/user", adminAuth.isAdmin, adminController.deleteUser);

let uploadController = require("../controller/uploadController");
router.post("/upload", tutorAuth.isTutor, uploadController.upload);

let fetchController = require("../controller/fetchFileController");
router.get("/fetch/file/:id", fetchController.file);
router.get("/fetch/image", tutorAuth.isTutor, fetchController.image);

let dashboardController = require("../controller/dashboardController");
router.get("/dashboard", dashboardController.dashboard);

let tutorPollController = require("../controller/TutorPollController");
router.post("/polls", createPollValidation, tutorPollController.createPoll);
router.get("/polls", tutorPollController.viewPolls);