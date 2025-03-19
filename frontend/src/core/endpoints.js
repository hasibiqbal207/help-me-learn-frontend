const baseUrl = `${import.meta.env.VITE_BACKEND_API_BASEURL}/api`;

export const loginApi = `${baseUrl}/auth/login`;
export const registerApi = `${baseUrl}/auth/registerUser`;
export const usersApi = `${baseUrl}/users`;
export const tutorSearchApi = `${baseUrl}/tutors`;
export const tutorsApi = `${baseUrl}/tutors`;
export const reviewApi = `${baseUrl}/reviews`;
export const courseApi = `${baseUrl}/courses`;
export const dashboardApi = `${baseUrl}/dashboard`;
export const offerCourseApi = `${baseUrl}/posts`;
export const qualificationApi = `${baseUrl}/qualifications`;
export const fileUploadApi = `${baseUrl}/upload`;

export const allStudentListApi = `${baseUrl}/users/?UserType=102`;
export const allTutorListApi = `${baseUrl}/users/?UserType=101`;
export const pendingTutorListApi = `${baseUrl}/courses?Status=100`;

export const socketIOUrl = `${import.meta.env.VITE_BACKEND_API_BASEURL}`;
export const filesApi = `${import.meta.env.VITE_BACKEND_API_BASEURL}`;

export const fetchApi = `${baseUrl}/fetch/file`;

export const getTutorInfoById = (id) => `${baseUrl}/tutors/` + id;
export const getTutorOfferedCoursesById = (id) =>
  `${baseUrl}/tutors/course/` + id;
export const getTutorQualificationById = (id) =>
  `${baseUrl}/tutors/qualification/` + id;
export const getTutorReviewsById = (id) => `${baseUrl}/tutors/reviews/` + id;

export const getFeedback = () => `${baseUrl}/feedback`;
