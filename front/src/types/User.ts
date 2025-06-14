type UserRole = "student" | "teacher" | "admin" | "anonymous";

interface SignUpInput {
  firstname: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
  description?: string;
  languages?: Array<string>;
}

interface SignInInput {
  email: string;
  password: string;
}
interface ProfileMe {
  idUser: number;
  name: string;
  firstname: string;
  email: string;
  languages?: Array<string>;
  description?: string;
  avatar?: string;
  nationality?: Array<string>;
  views?: number;
  role: UserRole;
  rating?: number;
}
export interface Teacher {
  idUser: number;
  name: string;
  firstname: string;
  email: string;
  languages?: string;
  role: UserRole;
  rating?: number | null;
}

export type { SignUpInput, SignInInput, UserRole, ProfileMe };
