import { Link } from "./link";

export interface Post {
    id?: string;
    title?: string;
    images?: string[];
    body?: string[];
    links?: Link[];
    status?: string;
}