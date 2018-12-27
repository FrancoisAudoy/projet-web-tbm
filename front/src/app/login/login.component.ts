/**
 * Ce composant définit la page de connection et de création de compte
 * ce composant intervient seulment quand l'utilisateur n'est pas connecté
 * Pour créer un compte il est nécessaire d'utiliser tout les champs de la classe idObject
 * pour se connecter il faut utiliser le pseudo et le mot de passe! l'email n'est pas un pseudo
 */
import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service'
import { IdObject } from '../IdObject'
import { LoginService } from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  creation: boolean = true;

  ID: string = "";
  password: string = "";
  login: LoginService;
  constructor(private query: QueryService, private loginserv: LoginService) { this.login = loginserv; }

  createAccount() {
    this.creation = true;
  }

  connectWithLogin() {
    this.creation = false;
  }

  onCreateAccount(mail: string, username: string, password: string) {
    let user: IdObject = { email: mail, pseudo: username, password: password};

    //this.query.postNewUser(user); probleme cors
    this.login.setToken("valide");
  }

  onConnect(pseudo: string, password: string){

  }

  ngOnInit() {
  }

}
