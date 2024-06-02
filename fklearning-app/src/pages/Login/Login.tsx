import { LoginForm } from "../../components/LoginForm/LoginForm";
import "./Login.css"

function LoginPage() {
    const user = {
        email: "test@test.fr",
        password : "test"
    }
    function onLogin(email: string, password: string){
        /* Call api pour le user */
        if(email === user.email && password === user.password){
            alert("Login successfully")
        } else {
            alert("Email or password incorrect")
        }
    }
    return (
        <div>
            <LoginForm onLogin={onLogin}/>
        </div>
    )
}
export { LoginPage }