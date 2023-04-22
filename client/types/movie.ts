import { Category } from "./category";
import { User, UserCurrentPopulate } from "./user";

export interface Movie{
    _id: string;
    title: string,
    link: string,
    category: string,
    user: string,
    image: string,
    createdAt: string,
    updatedAt: string
}

export interface MoviePopulate{
    _id: string;
    title: string,
    link: string,
    category: Category,
    user: User,
    image: string,
    createdAt: string,
    updatedAt: string
}

export interface MovieListType {
    movies: MoviePopulate[];
}
export interface MovieItemType{
    movie: MoviePopulate;
}

export interface MovieSideBarType{
    movie?: MoviePopulate,
    id: string
    movies: MoviePopulate[];
    user?: UserCurrentPopulate
}