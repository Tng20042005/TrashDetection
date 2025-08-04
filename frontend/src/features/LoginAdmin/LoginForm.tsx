
interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: () => void;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

export default function LoginForm({
    email, password, setEmail, setPassword, handleLogin, showPassword, setShowPassword
}: LoginFormProps) {
    return (
    <div className="admin-loginInput"> 
      <div className="admin-loginEmailInput">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="admin-loginPasswordInput">
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
            className="admin-login-toggle-password"
          >
            <img
              src={showPassword ? "/view.png" : "/eye.png"}
              alt={showPassword ? "Hide password" : "Show password"}
            />
          </button>
        )
      }
      </div>
      <button className="admin-loginButton"onClick={handleLogin}>Login</button>
    </div>
  );
}