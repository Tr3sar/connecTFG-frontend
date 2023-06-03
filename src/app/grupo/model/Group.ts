import { Message } from "../model/Message";
import { User } from "src/app/core/model/User";

export class Group {
    id : number;
    name: string;
    members: User[];
    messages: Message[];
    files: number[];
    description?: string;
}