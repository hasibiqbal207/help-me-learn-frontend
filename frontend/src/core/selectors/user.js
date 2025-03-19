export const getUserType = (state) => {
  if (state.user.current === undefined) return "guest";
  switch (state.user.current.status) {
    case 100: // Admin
      return "admin";
    case 101: // Tutor
      return "tutor";
    case 102: // Student
      return "student";
    default:
      return "guest";
  }
};

export const getLoginAlert = (state) => state.user.loginAlert;

export const getRegistrationAlert = (state) => state.user.registrationAlert;

export const isAuthenticated = (state) => state.user.isAuthenticated;

export const getCurrentUser = (state) => state.user.current;

export const getJwtSecret = (state) => ({
  Secret: state.user.current.token,
  Expiry: state.user.current.exp,
});
