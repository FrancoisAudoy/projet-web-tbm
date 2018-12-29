/**
 * Ce service gére si la connection de l'utilisateur
 */

import { Injectable, OnInit } from '@angular/core';
import { UserObject, QueryUserObject } from './UserObject';
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

  setToken(newToken: string) {
    this.token = newToken;
    this.loged = true;
  }

  getToken(): string {
    return this.token;
  }

  setUser(user: QueryUserObject) {
    this.user = user;
  }

  isLoged() {
    return this.loged;
  }

  invalidToken() {
    this.token = '';
    this.loged = false;
  }

  disconnect() {
    this.invalidToken()
    this.user = null;
  }

  getUser(): QueryUserObject {
    return this.user;
  }

  writeLogin() {
    let toWrite: QueryUserObject = {
      email: this.user.email,
      pseudo: this.user.pseudo,
      id: "",
      token: this.token
    }

    this.cookieService.set(this.cookieName, JSON.stringify(toWrite));
  }

  checkIfAlreadyConnect() {
    if (this.cookieService.check(this.cookieName)) {
      let cookie: string = this.cookieService.get(this.cookieName);
      let cookieParsed: QueryUserObject = JSON.parse(cookie);
      this.setUser(cookieParsed);
      this.setToken(cookieParsed.token);
    }
  }

}
