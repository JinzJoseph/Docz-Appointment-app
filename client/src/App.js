import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepages from "./pages/Homepages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./Component/Spinner";
import PublicRoute from "./Component/publicRoute";
import ProtectedRoute from "./Component/ProtectedRoute";

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
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
