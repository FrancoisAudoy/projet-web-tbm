import { Component, OnInit } from '@angular/core';
import { Trip } from '../arret';

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})
export class TrajetsComponent implements OnInit {

  private line: Trip[];

  constructor() {
    this.line = [
      {
        liste: [
          { id: 1, name: "Chemin Bon Air", line: "bus", lineName: "34", direction : "aller" },
          { id: 2, name: "Stade Cruchon", line: "bus", lineName: "34", direction : "aller" },
          { id: 3, name: "Les Menhirs", line: "bus", lineName: "34", direction : "aller" }
        ]
      },
      {
        liste: [
          { id: 4, name: "Lycée Pape Clément", line: "bus", lineName: "34", direction : "aller"},
          { id: 5, name: "Pont de l'Orient", line: "bus", lineName: "34", direction : "aller" },
          { id: 6, name: "Ste Marie", line: "bus", lineName: "34", direction : "aller" },
          { id: 7, name: "arts et métier", line: "bus", lineName: "8", direction : "aller" },
          { id: 8, name: "Piscine de thouars", line: "bus", lineName: "8", direction : "aller" }
        ]
      }
    ];
  }

  ngOnInit() {
  }

}
