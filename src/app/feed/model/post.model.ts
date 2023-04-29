import { User } from "src/app/core/model/User";
import { Comment } from "./comment.model";

export class Post {
    id: number;
    author: User;
    title: string;
    content: string;
    applicants: number[];
    likes: number;
    closed: boolean;
    createdAt: Date;
    comments: Comment[];
}