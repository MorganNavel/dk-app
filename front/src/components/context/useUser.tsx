"use client";
import { User } from "@/types/User";
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType>({
  user: {
    idUser: 1,
    firstname: "morgan",
    lastname: "navel",
    email: "morgan@gmail.com",
    phone: "truc",
  },
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    idUser: -1,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setUser({
      idUser: -1,
      firstname: "Morgan",
      lastname: "Navel",
      email: "navelmorgan34@gmail.com",
      phone: "0606060606",
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
