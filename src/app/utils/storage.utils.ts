import {User} from '@models/user.model';
import {TokenUser} from '@models/token-user.model';
import {TableTemplate} from '@models/table-template.model';

export class StorageUtils {

  private static readonly USER = 'USER';
  private static readonly IDIOMA = 'IDIOMA';
  private static readonly TEMPLATE = 'TEMPLATE';
  private static readonly USER_TOKEN = 'USER_TOKEN';

  private constructor() {

  }

  public static getUser(): User {
    const userJson = localStorage.getItem(StorageUtils.USER);
    return userJson ? new User(JSON.parse(userJson)) : null;
  }

  public static setUser(user: User): void {
    localStorage.setItem(StorageUtils.USER, JSON.stringify(user));
  }

  public static setDecodedToken(user: TokenUser): void {
    localStorage.setItem(StorageUtils.USER_TOKEN, JSON.stringify(user));
  }

  public static getDecodedToken(): TokenUser {
    return new TokenUser(JSON.parse(localStorage.getItem(StorageUtils.USER_TOKEN)));
  }

  public static removeDecodedToken(): void {
    localStorage.removeItem(StorageUtils.USER_TOKEN);
  }

  public static removeUser(): void {
    localStorage.removeItem(StorageUtils.USER);
  }

  public static getIdioma(): string {
    if (localStorage.getItem(StorageUtils.IDIOMA)==="" || localStorage.getItem(StorageUtils.IDIOMA)===null){
      this.setIdioma("es");
    }
    return localStorage.getItem(StorageUtils.IDIOMA);
  }

  public static setIdioma(idioma: string): void {
    localStorage.setItem(StorageUtils.IDIOMA, idioma);
  }

  public static getTemplate(): TableTemplate {
    const templateJson = localStorage.getItem(StorageUtils.TEMPLATE);
    return templateJson ? new TableTemplate(JSON.parse(templateJson)) : null;
  }

  public static setTemplate(template: TableTemplate): void {
    localStorage.setItem(StorageUtils.TEMPLATE, JSON.stringify(template));
  }

  public static removeTemplate(): void {
    localStorage.removeItem(StorageUtils.TEMPLATE);
  }
}
