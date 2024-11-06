import { body } from "express-validator";

const createUserValidation = [
  body("email").notEmpty().isEmail(),
  body("userType").notEmpty().isIn([100, 101, 102]),
  body("status").notEmpty().isIn([100, 101, 102]),
];

const updateUserValidation = [
  body("id").notEmpty().isInt(),
  body("email").notEmpty().isEmail(),
  body("userType").notEmpty().isIn([100, 101, 102]),
  body("status").notEmpty().isIn([100, 101, 102]),
];

const createTutorProfileValidation = [body("userId").notEmpty().isInt()];

const updateTutorProfileValidation = [
  body("userId").notEmpty().isInt(),
  body("status").notEmpty().isIn([100, 101, 102]),
];

const createPostValidation = [
  body("subjectName").notEmpty().isString(),
  body("status").notEmpty().isIn([100, 101, 102]),
  body("ratePerHour").notEmpty(),
];

const updatePostValidation = [
  body("id").notEmpty().isInt(),
  body("tutorProfileId").notEmpty().isInt(),
  body("subjectName").notEmpty().isString(),
  body("status").notEmpty().isIn([100, 101, 102]),
  body("ratePerHour").notEmpty(),
];

const createReviewValidation = [
  body("userId").notEmpty().isInt(),
  body("tutorProfileId").notEmpty().isInt(),
  body("text").isString(),
];

const createFeedbackValidation = [
  body("subject").notEmpty().isString(),
  body("description").notEmpty().isString(),
  body("userId").notEmpty().isInt(),
];

const updateReviewValidation = [
  body("id").notEmpty().isInt(),
  body("userId").notEmpty().isInt(),
  body("tutorProfileId").notEmpty().isInt(),
  body("text").isString(),
];

const createPollValidation = [
  body("id").notEmpty().isInt(),
  body("courseName").notEmpty().isString().isLength({ min: 1 }),
  body("description").notEmpty().isString().isLength({ min: 1 }),
  body("level").notEmpty().isString().isLength({ min: 1 }),
];

const createDeptValidation = [
  body("name").isString().notEmpty().isLength({ min: 1 }),
];

const updateDeptValidation = [
  body("id").notEmpty().isInt(),
  body("name").isString().notEmpty().isLength({ min: 1 }),
];

const createCourseValidation = [
  body("departmentId").notEmpty().isInt(),
  body("courseCode").notEmpty().isString().isLength({ min: 1 }),
  body("courseName").notEmpty().isString().isLength({ min: 1 }),
  body("level").notEmpty().isString().isLength({ min: 1 }),
];

const updateCourseValidation = [
  body("id").notEmpty().isInt(),
  body("departmentId").notEmpty().isInt(),
  body("courseCode").notEmpty().isString().isLength({ min: 1 }),
  body("courseName").notEmpty().isString().isLength({ min: 1 }),
  body("level").notEmpty().isString().isLength({ min: 1 }),
  body("status").notEmpty().isIn([100, 101, 102]),
];

const createQualificationValidation = [
  body("subjectName").notEmpty(),
  body("description").notEmpty(),
  body("grade").notEmpty(),
];

const updateQualificationValidation = [body("id").notEmpty().isInt()];

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
