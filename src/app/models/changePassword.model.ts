export class ChangePassword {
    public user: string;
    public oldPassword: string;
    public newPassword: string;

    constructor(data?: any) {
        if (data) {
            this.user = data.user;
            this.oldPassword = data.oldPassword;
            this.newPassword = data.newPassword;
        }
    }
}