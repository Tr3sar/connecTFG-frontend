import { Message } from "src/app/core/model/Message";

export class Group {
    id : number;
    name: string;
    members: number[];
    messages: Message[];
    files: number[];
    description?: string;
}