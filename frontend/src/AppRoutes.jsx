import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";

import ManageUsers from "./pages/home/admin/manageUsers/ManageUsers";
import ManageTutorsProfile from "./pages/home/admin/manageTutorsProfile/ManageTutorsProfile";
import { Anonymous } from "./router/Anonymous";
import { Authorized } from "./router/Authorized";
import TutorProfile from "./pages/tutorProfile/TutorProfile";
import StudentProfile from "./pages/studentProfile/StudentProfile";

// Admin panel pages
import Admin from "./pages/home/admin/index";
import TutorsList from "./pages/home/admin/tutors";
import StudentsList from "./pages/home/admin/students";
import AdminLayout from "./components/page/AdminLayout";

// Higher-order component to wrap a component with AdminLayout
const withAdminLayout = (Component) => (props) => (
  <AdminLayout>
    <Component {...props} />
  </AdminLayout>
);

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Anonymous component={Login} />} />
        <Route
          path="/registration"
          element={<Anonymous component={Registration} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Authorized component={ManageUsers} />} />
        <Route
          path="/posts"
          element={<Authorized component={ManageTutorsProfile} />}
        />
        <Route path="/tutor/:tutorId" element={<TutorProfile />} />
        <Route path="/tutor-profile/:tutorId" element={<Authorized component={TutorProfile} />} />
        <Route path="/student-profile/:studentId" element={<Authorized component={StudentProfile} />} />
        
        {/* Admin panel routes */}
        <Route path="/admin" element={<Authorized component={withAdminLayout(Admin)} />} />
        <Route path="/admin/tutors" element={<Authorized component={withAdminLayout(TutorsList)} />} />
        <Route path="/admin/students" element={<Authorized component={withAdminLayout(StudentsList)} />} />
      </Routes>
    </Router>
  );           
};

export default AppRoutes;
