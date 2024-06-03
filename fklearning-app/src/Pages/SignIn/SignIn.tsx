import { useNavigate } from "react-router";
import { SignInForm } from "../../components/SignInForm/SignInForm";
import { SignInInput, User } from "../../types/User";
import Header from "../../components/Header/Header";

function SignIn() {
  const navigate = useNavigate();
  function handleSignIn({ email, password }: SignInInput): User | undefined {
    const user: User = {
      idUser: 1,
      firstname: "John",
      lastname: "Doe",
      email,
      password,
      phone: "123456789",
    };
    return user;
  }
  function handleSwitch() {
    navigate("/sign-up");
  }
  return (
    <>
      <Header />
      <SignInForm
        onSignIn={handleSignIn}
        onSwitchToSignUp={handleSwitch}
      />
    </>
  );
}
export { SignIn };
