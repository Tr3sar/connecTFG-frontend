export class Message {
    id: number;
    text: string;
    createdAt: Date;
    viewed: boolean;
    emitter_id: number;
    receiver_id: number[];
}