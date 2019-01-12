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
import { UserObject, QueryUserObject } from '../UserObject';
import { Md5 } from '../../../node_modules/ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Md5]
})

export class LoginComponent implements OnInit {


  private email: string;
  private pseudo: string;
  private password: string;
  private creation: boolean = true;

  constructor(private query: QueryService, private loginService: LoginService,
    private snackBar: MatSnackBar, private md5: Md5) {
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

    let user: UserObject = { email: this.email, pseudo: this.pseudo, password: Md5.hashStr(this.password).toString() };
    this.query.postNewUser(user).subscribe(((resp: Config) => {
      if (resp.success == true) {
        let userSave: QueryUserObject;
        userSave.id = resp.message.id;
        userSave.email = resp.message.email;
        userSave.pseudo = resp.message.pseudo;
        userSave.token = resp.token; 
        this.loginService.setUser(userSave);
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
    let user: UserObject = { email: this.email, pseudo: this.pseudo, password: Md5.hashStr(this.password).toString() };
    this.query.postConnectUser(user).subscribe(((resp: Config) => {
      if (resp.success == true) {
        let userSave: QueryUserObject = new QueryUserObject;
        let messParsed = JSON.parse(resp.message);
        userSave.id = messParsed.id;
        userSave.email = messParsed.email;
        userSave.pseudo = messParsed.pseudo;
        userSave.token = resp.token; 
        this.loginService.setUser(userSave);
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
