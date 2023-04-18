export class UserLogin {

  public user: string;
  public password: string;

  constructor(data?: any) {
    if (data) {
      this.user = data.user;
      this.password = data.password;
    }
  }
}
