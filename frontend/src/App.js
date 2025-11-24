import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.js";
import Dashboard from "./pages/dashboard.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
