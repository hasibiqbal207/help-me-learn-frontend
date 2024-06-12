import { body } from "express-validator";

const createUserValidation = [
  body("Email").notEmpty().isEmail(),
  body("UserType").notEmpty().isIn([100, 101, 102]),
  body("Status").notEmpty().isIn([100, 101, 102]),
];

const updateUserValidation = [
  body("Id").notEmpty().isInt(),
  body("Email").notEmpty().isEmail(),
  body("UserType").notEmpty().isIn([100, 101, 102]),
  body("Status").notEmpty().isIn([100, 101, 102]),
];

const createTutorProfileValidation = [body("UserId").notEmpty().isInt()];

const updateTutorProfileValidation = [
  body("UserId").notEmpty().isInt(),
  body("Status").notEmpty().isIn([100, 101, 102]),
];

const createPostValidation = [
  body("SubjectName").notEmpty().isString(),
  body("Status").notEmpty().isIn([100, 101, 102]),
  body("RatePerHour").notEmpty(),
];

const updatePostValidation = [
  body("Id").notEmpty().isInt(),
  body("TutorProfileId").notEmpty().isInt(),
  body("SubjectName").notEmpty().isString(),
  body("Status").notEmpty().isIn([100, 101, 102]),
  body("RatePerHour").notEmpty(),
];

const createReviewValidation = [
  body("UserId").notEmpty().isInt(),
  body("TutorProfileId").notEmpty().isInt(),
  body("Text").isString(),
];

const createFeedbackValidation = [
  body("Subject").notEmpty().isString(),
  body("Description").notEmpty().isString(),
  body("UserId").notEmpty().isInt(),
];

const updateReviewValidation = [
  body("Id").notEmpty().isInt(),
  body("UserId").notEmpty().isInt(),
  body("TutorProfileId").notEmpty().isInt(),
  body("Text").isString(),
];

const createPollValidation = [
  body("Id").notEmpty().isInt(),
  body("CourseName").notEmpty().isString().isLength({ min: 1 }),
  body("Description").notEmpty().isString().isLength({ min: 1 }),
  body("Level").notEmpty().isString().isLength({ min: 1 }),
];

const createDeptValidation = [
  body("Name").isString().notEmpty().isLength({ min: 1 }),
];

const updateDeptValidation = [
  body("Id").notEmpty().isInt(),
  body("Name").isString().notEmpty().isLength({ min: 1 }),
];

const createCourseValidation = [
  body("DeptId").notEmpty().isInt(),
  body("CourseCode").notEmpty().isString().isLength({ min: 1 }),
  body("CourseName").notEmpty().isString().isLength({ min: 1 }),
  body("Level").notEmpty().isString().isLength({ min: 1 }),
];

const updateCourseValidation = [
  body("Id").notEmpty().isInt(),
  body("DeptId").notEmpty().isInt(),
  body("CourseCode").notEmpty().isString().isLength({ min: 1 }),
  body("CourseName").notEmpty().isString().isLength({ min: 1 }),
  body("Level").notEmpty().isString().isLength({ min: 1 }),
  body("Status").notEmpty().isIn([100, 101, 102]),
];

const createQualificationValidation = [
  body("SubjectName").notEmpty(),
  body("Description").notEmpty(),
  body("Grade").notEmpty(),
];

const updateQualificationValidation = [body("Id").notEmpty().isInt()];

export default {
  createUserValidation,
  updateUserValidation,
  createTutorProfileValidation,
  updateTutorProfileValidation,
  createPostValidation,
  updatePostValidation,
  createReviewValidation,
  createFeedbackValidation,
  updateReviewValidation,
  createPollValidation,
  createDeptValidation,
  updateDeptValidation,
  createCourseValidation,
  updateCourseValidation,
  createQualificationValidation,
  updateQualificationValidation,
};
