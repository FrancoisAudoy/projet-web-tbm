import { Component } from '@angular/core';
import { LoginService } from './login.service'
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Stops, Stop, AllLine, Line } from './arret';
import { QueryService } from './query.service';
import { parseString } from 'xml2js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  constructor(private login: LoginService, private iconRegister: MatIconRegistry, sanitizer: DomSanitizer,
    private query: QueryService) {
    this.iconRegister.addSvgIcon("cross", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/icon-cross.svg"));

    this.login.checkIfAlreadyConnect();
    this.query.getAllLineActive().subscribe((resp: string) => {
      console.log("reponse :");
      let allLine;
      parseString(resp, (err, res) => allLine = res["wps:ExecuteResponse"]["wps:ProcessOutputs"][0]["wps:Output"]);

      allLine.forEach(element => {
        let data = element["wps:Data"][0]["wps:ComplexData"][0]["gml:featureMember"][0]["bm:SV_LIGNE_A"][0];
        AllLine.push({
          id: data["bm:GID"][0],
          name: data["bm:LIBELLE"][0],
        });
      });
      console.log(AllLine);
    },
      (error => {
        console.log("erreur :");
        console.log(error);
      }));
  }

  disconnect() {
    this.login.disconnect();
  }

}
