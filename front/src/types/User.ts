type UserRole = "student" | "teacher" | "admin";

interface UserProfile {
  idUser: number;
  firstname: string;
  name: string;
  email: string;
  languages?: Array<string>;
  nationality?: Array<string>;
  description: string;
  password: string;
  role: UserRole;
}

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

export type { UserProfile, SignUpInput, SignInInput };
