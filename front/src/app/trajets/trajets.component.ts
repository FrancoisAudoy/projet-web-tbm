import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Trip, Stops, Stop } from '../arret';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { LoginService } from '../login.service';
import { QueryService } from '../query.service';
import { PersonalSnackBarService } from '../personal-snack-bar.service';
import { LineToLineMappedSource } from 'webpack-sources';

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})
export class TrajetsComponent implements OnInit {

  private trip: Trip[] = [];

  constructor(private dialog: MatDialog, private login: LoginService,
    private query: QueryService, private snackBar: PersonalSnackBarService) { }

  ngOnInit() {
    this.query.getAllTripOf(this.login.getUser()).subscribe((resp: []) => {
      for (let i: number = 0; i < resp.length; ++i) {
        let line: [] = resp[i];
        let liste: Stop[] = [];
        if (line.length > 0) {
          line.forEach((el: any) => {
            let stop: Stop = Stops.find(x => el._id == x.id && el._direction == x.direction);
            if (stop != undefined)
              liste.push(stop);
          });
          if (liste.length > 0)
            this.trip.push({ liste: liste });
        }
      }
    },
      error => {
        this.snackBar.openSnackBar(error.message);
        console.log(error.message);
      })
  }

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
          if (trajet.type[i] != undefined && trajet.name[i] != undefined && trajet.direction[i] != undefined)
            stop = Stops.find(x => trajet.type[i] == x.type
              && trajet.name[i] == x.name && trajet.direction[i].toLowerCase() == x.direction);
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
