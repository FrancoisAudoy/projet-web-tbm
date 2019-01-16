import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Stop, Stops, AllLine } from '../arret';
import { DialogStopComponent } from '../dialog-stop/dialog-stop.component';
import { QueryService } from '../query.service';
import { LoginService } from '../login.service';
import { Config } from 'protractor';
import { PersonalSnackBarService } from '../personal-snack-bar.service';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css']
})
export class StopComponent implements OnInit {

  SelectedStop: Stop[] = [];
  constructor(public dialRef: MatDialog,
    private query: QueryService, private login: LoginService,
    private snackBar: PersonalSnackBarService) {

    setTimeout(() => {
      this.query.getAllStopFor(this.login.getUser()).subscribe(((resp: Config) => {
        resp.forEach(element => {
          let _line = AllLine.find(line => line.name == element._line[0]);
          if (_line != undefined) {
            let _stop: Stop = _line.stops.find(stop => stop.id == element._id);
            if (_stop != undefined)
              this.SelectedStop.push(_stop);
          }
        });

      }));
    }, 8000);
  }

  ngOnInit() { }


  openDialog() {
    const diagRef = this.dialRef.open(DialogStopComponent, {
      width: '250px',
      data: Stops
    });

    diagRef.afterClosed().subscribe((arret) => {
      if (arret != undefined)
        if (arret.lineName != undefined && arret.name != undefined && arret.direction != undefined) {
          let line = AllLine.find(line => line.name === arret.lineName);

          let _stop = line.stops.find(stop => stop.id === arret.name);
          _stop.line.push(line.name);

          this.query.putAddArret(this.login.getUser(), _stop).subscribe(((resp: Config) => {
            if (resp != undefined && _stop != undefined)
              this.SelectedStop.push(_stop);
          }), (error => {
            this.snackBar.openSnackBar(error.message);
          }));


        }
    });
  }
}