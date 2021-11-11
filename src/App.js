import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// components
import Body from "./components/Admin/Body";
import Main from "./components/Main/Main";
import Listing from "./components/Main/Listing";
import Login from "./components/Main/Login";
import Signup from "./components/Main/Signup";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Main />} />
      <Route path="/admin" exact element={<Body />} />
      <Route path="/listing/:id" exact element={<Listing />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
