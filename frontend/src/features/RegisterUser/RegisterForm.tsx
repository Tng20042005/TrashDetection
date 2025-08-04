interface RegisterFormProps {
    email: string;
    username: string;
    password: string;
    setEmail: (email: string) => void;
    setUserName: (username: string) => void;
    setPassword: (password: string) => void;
    showPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
    handleRegisterUser: () => void;

}

export default function RegisterForm({
    email, username, password,setEmail, setUserName, setPassword,showPassword, setShowPassword ,handleRegisterUser
}: RegisterFormProps) {
    return (
        <div className="user-registerInput">
            <div className="user-registerUserName">
                <input placeholder="UserName" 
                value={username}
                onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div className="user-registerEmailInput">
                <input 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="user-registerPasswordInput">
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
                    className="user-register-toggle-password"
                >
                    <img
                    src={showPassword ? "/view.png" : "/eye.png"}
                    alt={showPassword ? "Hide password" : "Show password"}
                    />
                </button>
                )
            }
            </div>
            <button onClick={handleRegisterUser} className="user-registerButton"> Register</button>
        </div>
    );
}
