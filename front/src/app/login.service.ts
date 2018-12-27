/**
 * Ce service gére si la connection de l'utilisateur
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loged : boolean = false;
  token : string = "";

  constructor() { }

  setToken(newToken : string){
    this.token = newToken;
    this.loged = true;
  }

  isLoged(){
    return this.loged;
  }
}
