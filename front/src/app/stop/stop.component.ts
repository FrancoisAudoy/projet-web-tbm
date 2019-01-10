import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Stop, Stops } from '../arret';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogStopComponent } from '../dialog-stop/dialog-stop.component';
import { ScriptService } from '../script-service.service';
import { QueryService } from '../query.service';
import { LoginService } from '../login.service';
import { Config } from 'protractor';

declare var CUB: any;

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css']
})
export class StopComponent implements OnInit {

  SelectedStop: Stop[] = [];
  URL: string = 'https://data.bordeaux-metropole.fr/csv?key=369BEIMSVY';
  constructor(public dialRef: MatDialog, private scriptService: ScriptService,
    private query: QueryService, private login: LoginService,
    private snackBar: MatSnackBar) {
    /*this.scriptService.load('ApiCUB', 'Jquery').then(data => {
      CUB.ready(function () {
        CUB.init('zone-carte');
        CUB.disable();
        let transport = new CUB.Layer.Processing('Temps Reel', URL, { process: 'SV_CHEM_A' });
        console.log("CUB is ready");
      });

    });*/
  }

  ngOnInit() {
    this.query.getAllStopFor(this.login.getUser()).subscribe(((resp: Config) => {
      console.log(resp);
      resp.forEach(element => {
        let _stop = Stops.find(stop => stop.name == element._name && stop.id == element._id);
        if (_stop != undefined)
          this.SelectedStop.push(_stop);
      });

    }),
      (error => {
        this.openSnackBar(error.message);
        console.log(error.message);
      }));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 1000 });
  }

  openDialog() {
    console.log("toto");
    const diagRef = this.dialRef.open(DialogStopComponent, {
      width: '250px',
      data: Stops
    });

    diagRef.afterClosed().subscribe((arret) => {
      console.log(arret);
      if (arret.lineName != undefined && arret.name != undefined && arret.direction != undefined) {
        let _stop = Stops.find(stop => stop.name === arret.name &&
          stop.lineName === arret.lineName && stop.direction == arret.direction.toLowerCase());

        this.query.putAddArret(this.login.getUser(), _stop).subscribe(((resp: Config) => {
          console.log(resp);
          if (resp != undefined && _stop != undefined)
            this.SelectedStop.push(_stop);
        }), (error => {
          this.openSnackBar(error.message);
          console.log(error.message);
        }));


      }
    });
  }
}