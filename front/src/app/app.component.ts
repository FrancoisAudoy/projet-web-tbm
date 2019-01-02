import { Component } from '@angular/core';
import { LoginService } from './login.service'
import { QueryUserObject } from './UserObject';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  user: QueryUserObject;

  constructor(private login: LoginService, private iconRegister: MatIconRegistry, sanitizer: DomSanitizer) {
    this.iconRegister.addSvgIcon("cross", sanitizer.bypassSecurityTrustResourceUrl("  assets/icons/icon-cross.svg"));
    this.login.checkIfAlreadyConnect();
    this.user = this.login.getUser();
    console.log(this.user);
  }

  disconnect() {
    this.login.disconnect();
  }

}
