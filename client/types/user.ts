import { Movie } from "./movie";

export interface User {
  _id: string;
  name: string;
  image?: string;
}
export interface UserProps {
  userDetail : User
}
export interface UserCurrent {
  _id: string;
  name: string;
  email: string;
  password: string;
  movie: string[];
  roles: string[];
  auth: string;
  image: string;
}
export interface UserCurrentPopulate {
  _id: string;
  name: string;
  email: string;
  password: string;
  movie: Movie[];
  roles: string[];
  auth: string;
  image: string;
}

export interface UserCurrentPopulateInProp {
  user : UserCurrentPopulate
}


