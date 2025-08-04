import "../../styles/RegisterUser/RegisterPage.css"
import { useState } from "react";
import { registerUser} from "../../api/userApi";
import type { User } from "../../types/userType";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";


export default function () {
    const [email, setEmail] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()


    const handleRegisterUser = async () => {
        try {
            const userData = await registerUser(email, username, password, "User")
            setUser(userData)
            navigate("/LoginUser");
        }
        catch (error){
            console.error("Create account failed", error);
            setError("Create account failed, please try again!")
            setUser(null)
        } 
    }
    return(
        <div className = "user-registerContainer">
            <div className="user-registerBox">
                <h2 className='user-registerTitle'>
                    Sign up
                </h2>
                <RegisterForm
                email={email}
                username={username}
                password={password}
                setEmail={setEmail}
                setUserName={setUserName}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                handleRegisterUser={handleRegisterUser}
                />
                {error && <p className="register-errorMessage">{error}</p>}
            </div>
        </div>
    )
}