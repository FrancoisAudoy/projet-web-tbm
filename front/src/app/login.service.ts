/**
 * Ce service gére si la connection de l'utilisateur
 */

import { Injectable } from '@angular/core';
import { UserObject } from './UserObject';
import { timingSafeEqual } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loged: boolean = false;
  private token: string = "";
  private user: UserObject = null;

  constructor() { }

  setToken(newToken: string) {
    this.token = newToken;
    this.loged = true;
  }

  setUser(user: UserObject) {
    this.user = user;
  }

  isLoged() {
    return this.loged;
  }
}
