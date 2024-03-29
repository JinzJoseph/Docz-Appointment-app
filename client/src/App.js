import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepages from "./pages/Homepages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./Component/Spinner";
function App() {
  const { loading }    = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        { loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<Homepages />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        )
        }
      </BrowserRouter>
    </>
  );
}

export default App;
