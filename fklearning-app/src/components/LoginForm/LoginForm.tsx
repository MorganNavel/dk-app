import { FormEvent, useState } from "react";
import "./LoginForm.css"
interface LoginFormProps{
    onLogin: (email: string, password: string) => void
}


function LoginForm({onLogin} : LoginFormProps){
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = (event : FormEvent) => {
        event.preventDefault();
        onLogin(email, password);
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input type="text" className="form-input" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" className="form-input" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit" className="login-button">Login</button>
        </form>
    )
}

export { LoginForm }