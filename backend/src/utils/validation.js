const { body } = require("express-validator");

exports.createUserValidation = [
  body("Email").notEmpty().isEmail(),
  body("UserType").notEmpty().isIn([100, 101, 102]),
  body("Status").notEmpty().isIn([100, 101, 102]),
];

exports.updateUserValidation = [
  body("Id").notEmpty().isInt(),
  body("Email").notEmpty().isEmail(),
  body("UserType").notEmpty().isIn([100, 101, 102]),
  body("Status").notEmpty().isIn([100, 101, 102]),
];

exports.createTutorProfileValidation = [body("UserId").notEmpty().isInt()];

exports.updateTutorProfileValidation = [
  body("UserId").notEmpty().isInt(),
  body("Status").notEmpty().isIn([100, 101, 102]),
];

exports.createPostValidation = [
  body("SubjectName").notEmpty().isString(),
  body("Status").notEmpty().isIn([100, 101, 102]),
  body("RatePerHour").notEmpty(),
];

exports.updatePostValidation = [
  body("Id").notEmpty().isInt(),
  body("TutorProfileId").notEmpty().isInt(),
  body("SubjectName").notEmpty().isString(),
  body("Status").notEmpty().isIn([100, 101, 102]),
  body("RatePerHour").notEmpty(),
];

exports.createReviewValidation = [
  body("UserId").notEmpty().isInt(),
  body("TutorProfileId").notEmpty().isInt(),
  body("Text").isString(),
];

exports.createFeedbackValidation = [
  body("Subject").notEmpty().isString(),
  body("Description").notEmpty().isString(),
  body("UserId").notEmpty().isInt(),
];

exports.updateReviewValidation = [
  body("Id").notEmpty().isInt(),
  body("UserId").notEmpty().isInt(),
  body("TutorProfileId").notEmpty().isInt(),
  body("Text").isString(),
];

exports.createPollValidation = [
  body("Id").notEmpty().isInt(),
  body("CourseName").notEmpty().isString().isLength({ min: 1 }),
  body("Description").notEmpty().isString().isLength({ min: 1 }),
  body("Level").notEmpty().isString().isLength({ min: 1 }),
];

exports.createDeptValidation = [
  body("Name").isString().notEmpty().isLength({ min: 1 }),
];

exports.updateDeptValidation = [
  body("Id").notEmpty().isInt(),
  body("Name").isString().notEmpty().isLength({ min: 1 }),
];

exports.createCourseValidation = [
  body("DeptId").notEmpty().isInt(),
  body("CourseCode").notEmpty().isString().isLength({ min: 1 }),
  body("CourseName").notEmpty().isString().isLength({ min: 1 }),
  body("Level").notEmpty().isString().isLength({ min: 1 }),
];

exports.updateCourseValidation = [
  body("Id").notEmpty().isInt(),
  body("DeptId").notEmpty().isInt(),
  body("CourseCode").notEmpty().isString().isLength({ min: 1 }),
  body("CourseName").notEmpty().isString().isLength({ min: 1 }),
  body("Level").notEmpty().isString().isLength({ min: 1 }),
  body("Status").notEmpty().isIn([100, 101, 102]),
];

exports.createQualificationValidation = [
  body("SubjectName").notEmpty(),
  body("Description").notEmpty(),
  body("Grade").notEmpty(),
];

exports.updateQualificationValidation = [body("Id").notEmpty().isInt()];
