import { Component } from '@angular/core';
import { LoginService } from './login.service'
import { UserObject, QueryUserObject } from './UserObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  user: QueryUserObject;

  constructor(private login: LoginService) {
    this.login.checkIfAlreadyConnect();
    this.user = this.login.getUser();
    console.log(this.user);
  }

  disconnect(){
    this.login.disconnect();
  }

}
