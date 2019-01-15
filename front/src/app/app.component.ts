import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Stops, Stop, AllLine, Line } from './arret';
import { QueryService } from './query.service';
import { parseString } from 'xml2js';
import { CookieService } from 'ngx-cookie-service';
import { PersonalSnackBarService } from './personal-snack-bar.service';
import { Timeouts } from 'selenium-webdriver';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';

  constructor(private login: LoginService, private iconRegister: MatIconRegistry, sanitizer: DomSanitizer,
    private query: QueryService, private cookieService: CookieService, private personalSnack: PersonalSnackBarService) {
    this.iconRegister.addSvgIcon("cross", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/icon-cross.svg"));


  }

  ngOnInit() {
    this.login.checkIfAlreadyConnect();
    this.query.getAllLineActive().subscribe((resp: string) => {
      let allLine;
      parseString(resp, (err, res) => allLine = res["wps:ExecuteResponse"]["wps:ProcessOutputs"][0]["wps:Output"]);

      allLine.forEach(element => {
        let data = element["wps:Data"][0]["wps:ComplexData"][0]["gml:featureMember"][0]["bm:SV_LIGNE_A"][0];
        AllLine.push({
          id: data["bm:GID"][0],
          name: data["bm:LIBELLE"][0],
          stops: []
        });
      });
    },
      (error => {
        console.log("erreur :");
        console.log(error);
      }));

    this.retrieveAllStops();
    if (!this.cookieAllreadyExist())
      this.cookieWriteStops();

  }

  cookieAllreadyExist() {
    return this.cookieService.check("AllStops");
  }

  cookieWriteStops() {
    this.cookieService.set("AllStops", JSON.stringify(Stops));
  }

  retrieveAllStops() {
    let allStops: Stop[] = [];
    if (this.cookieAllreadyExist()) {
      allStops: [] = JSON.parse(this.cookieService.get("AllStops"));
      allStops.forEach((el: Stop) => {
        Stops.push(el);
      });
    }

    this.query.getAllBusStop().subscribe((resp: string) => {
      let allStopTBM;
      parseString(resp, (err, res) => allStopTBM = res["wfs:FeatureCollection"]["gml:featureMember"]);

      for (let it: number = 0; it < allStopTBM.length; ++it) {
        let lineDes = allStopTBM[it]["bm:TB_ARRET_P"][0]["bm:LIGNEDES"][0];
        lineDes = lineDes.split('/');
        if (lineDes.length == 1)
          lineDes = [lineDes];

        lineDes.forEach((lineName: string) => {
          let LineConcerned: Line[] = AllLine.filter(line => line.name == lineName);
          LineConcerned.forEach(line => {
            line.stops.push({
              name: allStopTBM[it]["bm:TB_ARRET_P"][0]["bm:NOMARRET"][0],
              id: allStopTBM[it]["bm:TB_ARRET_P"][0]["bm:GID"][0],
              type: "BUS",
              direction: "Aller",
              line: lineDes
            })
          })
        });
      }
      let time: Date = new Date();
    console.log("APP");
    console.log(time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds());
    },
      (error) => {
        console.log(error);
        this.personalSnack.openSnackBar(error);
      });
  }


  disconnect() {
    this.login.disconnect();
  }

}
