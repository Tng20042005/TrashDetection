import "../../styles/LoginAdmin/LoginPage.css";
import { useState } from "react";
import { loginAdmin } from "../../api/adminApi";
import type { Admin } from "../../types/adminType";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setAdmin] = useState<Admin | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleUserLogin = async () => {
    try {
      const adminData = await loginAdmin(email, password);
      setAdmin(adminData);
      localStorage.setItem("currentAdmin", JSON.stringify(adminData));
      setError(null);
      navigate("/DashboardAdmin"); // Adjust the route as necessary
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your email and password.");
      setAdmin(null);
    }
  }

  return (
    <div className="admin-loginContainer">
      <div className="admin-loginPanel">
        <div className="admin-loginLeft">
          <h1>Admin Panel</h1>
          <p>Wellcome! Please login to continue.</p>
        </div>
        <div className="admin-loginBox">
          <h2 className="admin-loginTitle">Login</h2>
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLogin={handleUserLogin}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {error && <p className="admin-loginErrorMessage">{error}</p>}
        </div>
      </div>
    </div>
  );
}
