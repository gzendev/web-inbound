export class ChangeEmail {
    public user: string;
    public email: string;

    constructor(data?: any) {
        if (data) {
            this.user = data.user;
            this.email = data.email;
        }
    }
}