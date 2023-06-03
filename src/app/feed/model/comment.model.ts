import { User } from "src/app/core/model/User";


export class Comment {
    id: number;
    author: User;
    message: string;
    likes: number;
    createdAt: Date;
}