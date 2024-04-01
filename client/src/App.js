import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepages from "./pages/Homepages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./Component/Spinner";
import PublicRoute from "./Component/publicRoute";
import ProtectedRoute from "./Component/ProtectedRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";

import UserList from "./pages/Admin/UserList";
import DoctorList from "./pages/Admin/DoctorList";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import BookAppointment from "./pages/BookAppointment";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            ></Route>

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepages />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/applydoctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/get-notification"
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <DoctorList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <DoctorProfile />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/doctor/bookAppointment/:id"
              element={
                <ProtectedRoute>
                  <BookAppointment />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
