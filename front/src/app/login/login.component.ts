/**
 * Ce composant définit la page de connection et de création de compte
 * ce composant intervient seulment quand l'utilisateur n'est pas connecté
 * Pour créer un compte il est nécessaire d'utiliser tout les champs de la classe UserObject
 * pour se connecter il faut utiliser le pseudo et le mot de passe! l'email n'est pas un pseudo
 */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueryService } from '../query.service';
import { LoginService } from '../login.service';
import { Config } from 'protractor';
import { UserObject } from '../UserObject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  private email: string;
  private pseudo: string;
  private password: string;
  private creation: boolean = true; 

  constructor(private query: QueryService, private loginService: LoginService,
    private snackBar: MatSnackBar) {
  }

  createAccount() {
    this.email = '';
    this.pseudo = '';
    this.password = '';
    this.creation = true;
  }

  connectWithLogin() {
    this.email = '';
    this.pseudo = '';
    this.password = '';
    this.creation = false;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 1000 });
  }

  onCreateAccount() {

    let user: UserObject = { email: this.email, pseudo: this.pseudo, password: this.password };
    this.query.postNewUser(user).subscribe(((resp: Config) => {
      if (resp.success == true) {
        this.loginService.setToken(resp.token);
        //let queryUser: QueryUserObject = JSON.parse(resp.message);
        this.loginService.setUser(user);
        this.loginService.writeLogin();
      }
    }),
      (error => {
        this.openSnackBar(error.message);
        console.log(error.message);
      }
      ));

  }

  onConnect() {
    let user: UserObject = { email: this.email, pseudo: this.pseudo, password: this.password };
    this.query.postConnectUser(user).subscribe(((resp: Config) => {
      if (resp.success == true) {
        this.loginService.setToken(resp.token);
        //let queryUser: QueryUserObject = JSON.parse(user);
        this.loginService.setUser(user);
        this.loginService.writeLogin();
      }
    }),
      (error => {
        this.openSnackBar(error.message);
        console.log(error.message);
      }
      ));
  }

  ngOnInit() { }

}
