import { UserRole } from "@/models/UserModel";
import { Session } from "express-session";

export interface AppSession extends Session {
  user: UserSession;
}

export interface UserSession {
  idUser: number;
  name: string;
  firstname: string;
  email: string;
  languages?: string;
  description?: string;
  avatar?: string;
  nationality?: string;
  views?: number;
  role: UserRole;
  rating?: number;
}
