/**
 * Ce service gére si la connection de l'utilisateur
 */

import { Injectable, OnInit } from '@angular/core';
import { QueryUserObject, UserObject } from './UserObject';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loged: boolean = false;
  private token: string = "";
  private user: QueryUserObject = null;

  private cookieName: string = 'Projet-Web-TBM';

  constructor(private cookieService: CookieService) { }

  getToken(): string {
    return this.token;
  }

  setUser(user: QueryUserObject) {
    console.log(user);
    this.user = user;
    this.token = this.user.token;
    this.loged = true;
  }

  isLoged() {
    return this.loged;
  }

  invalidToken() {
    this.token = '';
    this.loged = false;
  }

  deleteCookie() {
    this.cookieService.delete(this.cookieName);
  }

  disconnect() {
    this.invalidToken();
    this.deleteCookie();
    this.user = null;
  }

  getUser(): QueryUserObject {
    return this.user;
  }

  writeLogin() {
    this.cookieService.set(this.cookieName, JSON.stringify(this.user));
  }

  checkIfAlreadyConnect() {
    if (this.cookieService.check(this.cookieName)) {
      let cookie: string = this.cookieService.get(this.cookieName);
      let cookieParsed: QueryUserObject = JSON.parse(cookie);
      this.user = cookieParsed;
      this.loged = true;
    }
  }

}
