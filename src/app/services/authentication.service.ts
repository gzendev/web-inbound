import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {RequestUtils} from '@utils/request.utils';
import {StorageUtils} from '@utils/storage.utils';
import {ResponseData} from '@models/response-data.model';
import {UserLogin} from '@models/user-login.model';
import {User} from '@models/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenUser} from '@app/models/token-user.model';
import { PasswordRecovery } from '@app/models/password-recovery.model';
import { UserRecovery } from '@app/models/user-recovery.model';
import { ChangePassword } from '@app/models/changePassword.model';
import { ChangeEmail } from '@app/models/changeEmail.model';
import { ResponseBase } from '@app/models/response-base.model';
import { FindUser } from '@app/models/find-User.model';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {

  }

  public login(userLogin: UserLogin): Observable<User> {
    const httpUrl = RequestUtils.getCommonApiUrl('/login');
    const httpOptions = RequestUtils.getJsonOptions();
    const helper = new JwtHelperService();

    return this.httpClient.post<ResponseData<User>>(httpUrl, userLogin, httpOptions).pipe(
      map((data: ResponseData<User>) => {
        const user = new User(data.response);
        const decodedToken = new TokenUser(helper.decodeToken(data.response.token));
        StorageUtils.setUser(user);
        StorageUtils.setDecodedToken(decodedToken);
        return user;
      })
    );
  }

  public changePass(userChange: ChangePassword): Observable<PasswordRecovery>{
    const httpUrl = RequestUtils.getCommonApiUrl('/usuario/passwordChange');
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.post<ResponseData<PasswordRecovery>>(httpUrl, userChange, httpOptions).pipe(
      map((data: ResponseData<PasswordRecovery>) => {
        const passrec = new PasswordRecovery(data.response);
        return passrec;
      })
    );
  }

  public changeEmail(emailChange: ChangeEmail): Observable<ResponseBase>{
    const httpUrl = RequestUtils.getCommonApiUrl('/usuario/emailChange');
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.post<ResponseData<ResponseBase>>(httpUrl, emailChange, httpOptions).pipe(
      map((data: ResponseData<ResponseBase>) => {
        const passrec = new ResponseBase(data.response);
        return passrec;
      })
    );
  }

  public findUser(findUser: FindUser): Observable<User>{
    const httpUrl = RequestUtils.getCommonApiUrl('/usuario/find');
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.post<ResponseData<User>>(httpUrl, findUser, httpOptions).pipe(
      map((data: ResponseData<User>) => {
        const passrec = new User(data.response);
        return passrec;
      })
    );
  }

  public recovery(user: string): Observable<PasswordRecovery>{
    let userRecovery = new UserRecovery();
    userRecovery.user = user;
    const httpUrl = RequestUtils.getCommonApiUrl('/login/passwordRecovery');
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.post<ResponseData<PasswordRecovery>>(httpUrl, userRecovery, httpOptions).pipe(
      map((data: ResponseData<PasswordRecovery>) => {
        const passrec = new PasswordRecovery(data.response);
        return passrec;
      })
    );
    
  }

  public logout(): void {
    StorageUtils.removeUser();
    //StorageUtils.removeTemplate();
  }

  public getUser(): User {
    return StorageUtils.getUser();
  }

  public getToken(): string {
    const user = this.getUser();
    return user ? user.token : null;
  }

  public isAuthenticated(): boolean  {
    return this.getUser() ? true : false;
  }

  public recentAccess(lastUrl: string) {
    const httpUrl = RequestUtils.getCommonApiUrl('/menu/recent?sistemaId=70');
    //const httpOptions = RequestUtils.getJsonOptions();
/*     let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Authorization'}) */
    return this.httpClient.post(httpUrl, {lastUrl: lastUrl})
/*     .pipe(
      map(() => {
        console.log("pipe work!");
      })
    );  */
  }
}
