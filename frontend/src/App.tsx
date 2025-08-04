import LoginUser from "./pages/LoginUser";
import DashboardUser from "./pages/DashboardUser";
import LoginAdmin from "./pages/LoginAdmin";
import DashboardAdmin from "./pages/DashboardAdmin";
import RegisterUser from "./pages/RegisterUser"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LoginUser" element={<LoginUser />} />  
        <Route path="/DashboardUser" element={<DashboardUser />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/RegisterUser" element={<RegisterUser/>}></Route>
      </Routes>
    </Router>
  );
}