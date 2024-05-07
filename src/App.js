import Login from "./pages/Login.js";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Info from "./pages/Info.js";
import Dashboard from "./pages/Dashboard.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Dashboard />} />
        <Route path="/info" element={<Info />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
