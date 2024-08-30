import { Session } from "express-session";

export interface AppSession extends Session {
  user: UserSession;
}

interface UserSession {
  idUser?: number;
  name?: string;
  firstname?: string;
  email?: string;
  languages?: string;
  description?: string;
  avatar?: string;
  nationality?: string;
  views?: number;
}
