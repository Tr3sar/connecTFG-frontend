import { User } from "src/app/core/model/User";

export class Notification {
    id: number;
    message: string;
    user: User;
    createdAt: Date;
}