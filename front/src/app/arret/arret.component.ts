import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Arret } from '../arret';
import { BehaviorSubject } from 'rxjs';
import { DialogBusComponent } from '../dialog-bus/dialog-bus.component';

@Component({
  selector: 'app-arret',
  templateUrl: './arret.component.html',
  styleUrls: ['./arret.component.css']
})
export class ArretComponent implements OnInit {
  ARRETS: Arret[] = [
    { id: 1, name: "Chemin Bon Air", line: "bus", lineName: "34", type: "corol" },
    { id: 2, name: "Stade Cruchon", line: "bus", lineName: "34", type: "corol" },
    { id: 3, name: "Les Menhirs", line: "bus", lineName: "34", type: "corol" },
    { id: 4, name: "Lycée Pape Clément", line: "bus", lineName: "34", type: "corol" },
    { id: 5, name: "Pont de l'Orient", line: "bus", lineName: "34", type: "corol" },
    { id: 6, name: "Ste Marie", line: "bus", lineName: "34", type: "corol" },
    { id: 7, name: "A&m", line: "bus", lineName: "8", type: "liane" },
    { id: 8, name: "Piscine", line: "bus", lineName: "8", type: "liane" }
  ];

  SelectedStop: Arret[] = [];

  constructor(public dialRef: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    console.log("toto");
    const diagRef = this.dialRef.open(DialogBusComponent, {
      width: '250px',
      data: this.ARRETS
    });

    diagRef.afterClosed().subscribe((arret) => {
      if (arret.lineName != undefined && arret.name != undefined) {
        let _stop = this.ARRETS.find(stop => stop.name === arret.name && stop.lineName === arret.lineName);

        if (_stop != undefined)
          this.SelectedStop.push(_stop);
      }
    });
  }


}
