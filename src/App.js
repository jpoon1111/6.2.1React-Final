import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from './pages/Home';
import Landing from "./pages/Landing";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} ></Route>  
          <Route path="/home" element={<Home />} ></Route>  
          <Route path="/home/:search" element={<Home />} ></Route>  
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
