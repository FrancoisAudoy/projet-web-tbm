import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Stop, Stops } from '../arret';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogStopComponent } from '../dialog-stop/dialog-stop.component';
import { ScriptService } from '../script-service.service';
import { QueryService } from '../query.service';
import { LoginService } from '../login.service';
import { Config } from 'protractor';
import { PersonalSnackBarService } from '../personal-snack-bar.service';

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
    private snackBar: PersonalSnackBarService) { }

  ngOnInit() {
    this.query.getAllStopFor(this.login.getUser()).subscribe(((resp: Config) => {
      resp.forEach(element => {
        let _stop = Stops.find(stop => stop.name == element._name && stop.id == element._id);
        if (_stop != undefined)
          this.SelectedStop.push(_stop);
      });

    }),
      (error => {
        this.snackBar.openSnackBar(error.message);
        console.log(error.message);
      }));
  }


  openDialog() {
    const diagRef = this.dialRef.open(DialogStopComponent, {
      width: '250px',
      data: Stops
    });

    diagRef.afterClosed().subscribe((arret) => {
      if (arret != undefined)
        if (arret.lineName != undefined && arret.name != undefined && arret.direction != undefined) {
          let _stop = Stops.find(stop => stop.name === arret.name &&
            stop.type === arret.lineName && stop.direction == arret.direction.toLowerCase());

          this.query.putAddArret(this.login.getUser(), _stop).subscribe(((resp: Config) => {
            console.log(resp);
            if (resp != undefined && _stop != undefined)
              this.SelectedStop.push(_stop);
          }), (error => {
            this.snackBar.openSnackBar(error.message);
            console.log(error.message);
          }));


        }
    });
  }
}