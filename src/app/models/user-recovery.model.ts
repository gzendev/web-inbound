export class UserRecovery {
    public user: string;

    constructor(data?: any) {
        if (data) {
            this.user = data.user;
        }

    }
}