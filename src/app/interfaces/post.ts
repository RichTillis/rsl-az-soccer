import { Link } from "./link";

export interface Post {
    title?: string;
    img?: string;
    images?: string[];
    body?: string[];
    links?: Link[];
}