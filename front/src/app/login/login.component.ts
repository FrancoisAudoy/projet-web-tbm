/**
 * Ce composant définit la page de connection et de création de compte
 * ce composant intervient seulment quand l'utilisateur n'est pas connecté
 * Pour créer un compte il est nécessaire d'utiliser tout les champs de la classe idObject
 * pour se connecter il faut utiliser le pseudo et le mot de passe! l'email n'est pas un pseudo
 */
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { QueryService } from '../query.service'
import { IdObject } from '../IdObject'
import { LoginService } from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private creation: boolean = true;

  private email: string;
  private pseudo : string;
  private password : string;
  private login: LoginService;
  constructor(private query: QueryService, private loginserv: LoginService) { this.login = loginserv; }

  createAccount() {
    this.creation = true;
  }

  connectWithLogin() {
    this.creation = false;
  }

  onCreateAccount() {

    let user: IdObject = { email: this.email, pseudo: this.pseudo, password: this.password };
    //this.query.postNewUser(user); probleme cors
    this.login.setToken("valide");
  }

  onConnect(pseudo: string, password: string) {
    let user : IdObject = {email: null, pseudo : this.pseudo, password : this.password};
  }

  ngOnInit() {
  }

}
