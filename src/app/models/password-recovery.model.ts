
export class PasswordRecovery {
  public hasError: boolean;
  public stacktrace: string;
  public message: string;
  public response: string;
   
  constructor (data?:any){
    if (data) {
      this.hasError = data.hasError;
      this.stacktrace = data.stacktrace;
      this.message = data.message;
      this.response = data.response;
    }
  }
 }
