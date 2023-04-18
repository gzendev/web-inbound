import { ResponseData } from "./response-data.model";

export class ResponseBase implements ResponseData<String> {
  hasError: boolean;
  message: string;
  response: String;

  constructor (data?:any){
    if (data) {
      this.hasError = data.hasError;
      this.message = data.message;
      this.response = data.response;
    }
  }
}
