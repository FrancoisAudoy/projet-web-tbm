import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Trip, Stops, Stop, AllLine, Line } from '../arret';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { LoginService } from '../login.service';
import { QueryService } from '../query.service';
import { PersonalSnackBarService } from '../personal-snack-bar.service';

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})
export class TrajetsComponent implements OnInit {

  public trip: Trip[] = [];

  constructor(private dialog: MatDialog, private login: LoginService,
    private query: QueryService, private snackBar: PersonalSnackBarService) {
  
    setTimeout(() => {
      this.query.getAllTripOf(this.login.getUser()).subscribe((resp: []) => {
        for (let i: number = 0; i < resp.length; ++i) {
          let line: [] = resp[i];
          let liste: Stop[] = [];

          if (line.length > 0) {
            line.forEach((el: any) => {

              if (el != null) {
                let concernedLine: Line = AllLine.find(line => el._line[0] == line.name);
                if (concernedLine != undefined) {
                  let _stop = concernedLine.stops.find(stop => el._id == stop.id)
                  if (_stop != undefined)
                    liste.push(_stop);
                }
              }
            });

            if (liste.length > 0)
              this.trip.push({ liste: liste });

          }
        }
      });
    }, 8000);
  }

  ngOnInit() { }

  openDialog() {
    const dial = this.dialog.open(DynamicDialogComponent, {
      width: 'auto',
      data: Stops
    });

    dial.afterClosed().subscribe((trajet) => {
      if (trajet != undefined) {

        let liste: Stop[] = [];
        for (let i: number = 0; i < trajet.size; ++i) {
          let stop: any;
          if (trajet.lineName[i] != undefined && trajet.name[i] != undefined && trajet.direction[i] != undefined) {
            let concernedLine: Line = AllLine.find(line => trajet.lineName[i] == line.name);
            stop = concernedLine.stops.find(x => trajet.name[i] == x.id);
          }
          if (stop != undefined)
            liste.push(stop);
        }

        if (liste.length > 0) {
          this.trip.push({ liste: liste });
          this.query.putAddTripOf(this.login.getUser(), { liste: liste }).subscribe(null,
            error => {
              this.snackBar.openSnackBar(error.message);
              console.log(error.message);
            });
        }

      }
    });
  }

}
