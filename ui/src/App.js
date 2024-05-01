import Home from "./pages/home/index"; 
import Chapters from "./pages/chapters/index"; // Assuming MyComponent is in a separate file

import Footer from "./components/footer";
import Header from "./components/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterList from "./components/characters";
import ChatComponent from "./pages/chat";

function App() {
  return (
    <Router>
      <div style={{height : "95vh"}}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route at root path */}
          <Route path="/chapters" element={<Chapters />} />{" "}
          <Route path="/characters" element={<CharacterList />} />{" "}
          <Route path="/learn" element={<ChatComponent />} />{" "}

          {/* Chapters route with dynamic parameter */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
