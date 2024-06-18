interface User {
    idUser: number;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    description?: string;
    phone: string;
  }
  
  interface SignUpInput {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
  }
  
  interface SignInInput {
    email: string;
    password: string;
  }
  
  export type { User, SignUpInput, SignInInput };