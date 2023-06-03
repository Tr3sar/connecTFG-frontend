import { User } from "src/app/core/model/User";

export class Message {
    emitter: User;
    text: string;
    file: {
        href: string,
        filename: string
    };
}