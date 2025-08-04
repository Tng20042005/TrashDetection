import "../../styles/LoginUser/LoginPage.css";
import { useState, useEffect } from "react";
import { loginUser } from "../../api/userApi";
import type { User } from "../../types/userType";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberUser");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);
  const handleLoginUser = async () => {
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      
      if (rememberMe) {
        localStorage.setItem("rememberUser", email );
      } else {
        localStorage.removeItem("rememberUser");
      }
      setError(null);
      navigate("/DashboardUser");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your email and password.");
      setUser(null);
    }
  }

  return (
    <div className="user-loginContainer">
      <div className="user-loginBox">
        <h2 className="user-loginTitle">Login</h2>
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLoginUser={handleLoginUser}
          remmberMe={rememberMe}
          setRememberMe={setRememberMe}
          showPassword ={showPassword}
          setShowPassword={setShowPassword}
        />
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>
  );
}
