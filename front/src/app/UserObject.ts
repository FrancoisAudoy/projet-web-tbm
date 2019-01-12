/**
 * Cette classe définit les informations nécessaire à la connection et à la création de compte
 */
export class UserObject {
    email: string;
    pseudo: string;
    password: string;
};

export class QueryUserObject {
    email: string;
    pseudo: string;
    id: string;
    token: string;
};