import Home from "./pages/home/index"; 
import Chapters from "./pages/chapters/index"; // Assuming MyComponent is in a separate file

import Footer from "./components/footer";
import Header from "./components/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route at root path */}
          <Route path="/chapters" element={<Chapters />} />{" "}
          {/* Chapters route with dynamic parameter */}
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
