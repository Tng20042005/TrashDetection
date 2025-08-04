
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLoginUser: () => void;
  remmberMe: boolean;
  setRememberMe: (rememberMe: boolean) => void;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

export default function LoginForm({
    email, password, setEmail, setPassword, handleLoginUser, remmberMe,setRememberMe, showPassword, setShowPassword 
}: LoginFormProps) {
    const navigate = useNavigate()
    return (
    <div className="user-classInput">
      <div className= "user-emailInput">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="user-passwordInput">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          {password.length > 0 && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-password"
          >
            <img
              src={showPassword ? "/view.png" : "/eye.png"}
              alt={showPassword ? "Hide password" : "Show password"}
            />
          </button>
        )
      }
      </div>
      <button onClick={handleLoginUser} className="user-loginButton">Login</button>
      <div className="user-options">
        <label className="user-remember-label">
          Remember Me 
          <input type="checkbox" checked={remmberMe} onChange={(e) => setRememberMe(e.target.checked)}/>      
        </label>
        <label className="user-create-account" onClick = {() => navigate("/RegisterUser")}
>
          Create Account
        </label>
      </div>
    </div>
  );
}