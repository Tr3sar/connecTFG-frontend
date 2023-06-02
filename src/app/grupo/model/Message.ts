import { User } from "src/app/core/model/User";

export class Message {
    emitter: User;
    text: string;
    file: {
        data: any,
        filename: string,
        contentType: string
    };
}