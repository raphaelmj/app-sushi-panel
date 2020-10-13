import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/config';

@Injectable()
export class UserService {
  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = API_URL;
  }

  checkLoginAndMakeToken(nick: string, password: string, role: string): Promise<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }),
    };
    return this.httpClient
      .post(
        this.apiUrl + '/api/auth/login',
        { nick: nick, password: password, role },
        options,
      )
      .toPromise()
      .then((res: Response) => {
        return res || {};
      });
  }

  isAuth(): Promise<any> {
    return this.httpClient
      .get(this.apiUrl + '/api/auth/check')
      .toPromise()
      .then((res: Response) => {
        return res || { success: false };
      });
  }

  logout() {
    return this.httpClient
      .post(this.apiUrl + '/api/auth/logout', {})
      .toPromise();
  }
}
