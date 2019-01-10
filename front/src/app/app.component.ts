import { Component } from '@angular/core';
import { LoginService } from './login.service'
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  constructor(private login: LoginService, private iconRegister: MatIconRegistry, sanitizer: DomSanitizer) {
    this.iconRegister.addSvgIcon("cross", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/icon-cross.svg"));

    this.login.checkIfAlreadyConnect();
  }

  disconnect() {
    this.login.disconnect();
  }

}
