import './App.css';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Coin from './pages/Coin';
import Compare from './pages/Compare';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/coin/:id" element={<Coin />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
