import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { SignIn } from "../Pages/SignIn/SignIn";
import { SignUp } from "../Pages/SignUp/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/my-account", element: <SignIn /> },
      { path: "/orders", element: <SignIn /> },
      { path: "/subscriptions", element: <SignIn /> },
      { path: "/orders", element: <SignIn /> },
      { path: "/level-test", element: <SignIn /> },
      { path: "/catalog", element: <SignIn /> },
      { path: "/home", element: <SignIn /> },
      { path: "/pricing", element: <SignIn /> },
    ],
  },
]);
