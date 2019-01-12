import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Trip, Stops, Stop } from '../arret';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})
export class TrajetsComponent implements OnInit {

  private line: Trip[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dial = this.dialog.open(DynamicDialogComponent, {
      width: 'auto',
      data: Stops
    });

    dial.afterClosed().subscribe((trajet) => {
      console.log(trajet)
      if (trajet != undefined) {

        let liste: Stop[] = [];
        for (let i: number = 0; i < trajet.size; ++i) {
          let stop: any;
          if (trajet.lineName[i] != undefined && trajet.name[i] != undefined && trajet.direction[i] != undefined)
            stop = Stops.find(x => trajet.lineName[i] == x.lineName
              && trajet.name[i] == x.name && trajet.direction[i].toLowerCase() == x.direction);
          console.log(stop);
          if (stop != undefined)
            liste.push(stop);
        }

        if (liste.length > 0)
          this.line.push({ liste: liste });

      }
    });
  }

}
