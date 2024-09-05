"use client";
import { UserProfile } from "@/types/User";
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

interface UserContextType {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

const UserContext = createContext<UserContextType>({
  profile: {
    idUser: -1,
    firstname: "",
    name: "",
    email: "",
    languages: [],
    nationality: [],
    description: "",
    role: "student",
  },
  setProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>({
    idUser: -1,
    firstname: "",
    name: "",
    email: "",
    languages: [],
    nationality: [],
    description: "",
    role: "student",
  });

  useEffect(() => {
    setProfile({
      idUser: -1,
      firstname: "morgan",
      name: "navel",
      email: "",
      languages: [],
      nationality: [],
      description: "",
      role: "student",
    });
  }, []);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useProfile = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
