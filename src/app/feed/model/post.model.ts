import { User } from "src/app/core/model/User";

export class Post{
    id: number;
    author: User;
    title: string;
    content: string;
    applicant: string[];
    likes: number;
    closed: boolean;
    createdAt: Date;
    comment: string[];    
}