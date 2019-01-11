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

  private line: Trip[];

  constructor(private dialog: MatDialog) {
    this.line = [
      {
        liste: [
          { id: 1, name: "Chemin Bon Air", line: "bus", lineName: "34", direction: "aller" },
          { id: 2, name: "Stade Cruchon", line: "bus", lineName: "34", direction: "aller" },
          { id: 3, name: "Les Menhirs", line: "bus", lineName: "34", direction: "aller" }
        ]
      },
      {
        liste: [
          { id: 4, name: "Lycée Pape Clément", line: "bus", lineName: "34", direction: "aller" },
          { id: 5, name: "Pont de l'Orient", line: "bus", lineName: "34", direction: "aller" },
          { id: 6, name: "Ste Marie", line: "bus", lineName: "34", direction: "aller" },
          { id: 7, name: "arts et métier", line: "bus", lineName: "8", direction: "aller" },
          { id: 8, name: "Piscine de thouars", line: "bus", lineName: "8", direction: "aller" }
        ]
      }
    ];
  }

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
