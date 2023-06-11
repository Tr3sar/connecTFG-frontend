export class User{
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    social_url: string[];
    tfg_url: string;
    description: string;
    university_id: number;
    degree: string;
    conections: User[]
    rol: string;
    status: string;
    //post_id: number[];
    //notification_id: number[]
    //group_id: number[];
}