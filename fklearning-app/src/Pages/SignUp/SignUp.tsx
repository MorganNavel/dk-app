import { useNavigate } from "react-router";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { SignUpInput, User } from "../../types/User";

function SignUp() {
  const navigate = useNavigate();
  function handleSignUp(credentials: SignUpInput): User | undefined {
    const user: User = {
      idUser: 1,
      firstname: credentials.firstname,
      lastname: credentials.lastname,
      email: credentials.email,
      password: credentials.password,
      phone: credentials.phone,
    };
    return user;
  }
  function handleSwitch() {
    navigate("/sign-in");
  }

  return (
    <>
      <SignUpForm
        onSignUp={handleSignUp}
        onSwitchToSignIn={handleSwitch}
      />
    </>
  );
}

export { SignUp };
