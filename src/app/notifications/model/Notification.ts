import { User } from "src/app/core/model/User";
import { NotificationType } from "./NotificationType";

export class Notification {
    id: number;
    type: NotificationType;
    emitter: User;
    receiver: User;
    createdAt: Date;
}