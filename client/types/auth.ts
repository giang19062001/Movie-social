import { UserCurrent } from "./user";

export interface openRegisterType {
  openRegister: boolean;
  setOpenRegisterChild: (value: React.SetStateAction<boolean>) => void;
}

export interface RegisterForm {
  email: string;
  name: string;
  password: string;
}

export interface openLoginType {
  openLogin: boolean;
  setOpenLoginChild: (value: React.SetStateAction<boolean>) => void;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface ReduxTokens {
   user: UserCurrent | null;
   tokens : Tokens | null
}