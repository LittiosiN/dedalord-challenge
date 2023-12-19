export interface iRegisterInputs {
  username: string
  password: string
  passwordConfirmation: string
}

export interface iLoginInputs {
  username: string
  password: string
}

export interface User {
  username: string;
  sessionToken: string;
}