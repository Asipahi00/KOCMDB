import "./styles/Home.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { Actors } from "./pages";
import { Movies } from "./pages";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Actors" element={<Actors />} />
      <Route path="/Movies" element={<Movies />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
