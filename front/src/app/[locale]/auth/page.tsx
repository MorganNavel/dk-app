"use client";
import "@/globals.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { SignInForm } from "@/components/SignInForm";
import { SignUpForm } from "@/components/SignUpForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Header } from "@/components/header/Header";
import { Toaster } from "sonner";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative w-full max-w-md mb-8">
          <div className="flex justify-around">
            <button
              onClick={() => setIsSignIn(true)}
              className={`text-lg font-semibold pb-2 ${
                isSignIn ? "text-primary" : "text-gray-400"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`text-lg font-semibold pb-2 ${
                !isSignIn ? "text-primary" : "text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>

          <motion.div
            className="absolute bottom-0 w-1/2 h-1 bg-primary"
            initial={{ x: isSignIn ? 0 : "100%" }}
            animate={{ x: isSignIn ? 0 : "100%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <motion.div
          key={isSignIn ? "sign-in" : "sign-up"}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
        >
          {isSignIn ? <SignInForm /> : <SignUpForm />}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
      <Toaster richColors />
    </LocalizationProvider>
  );
};

export default AuthPage;
