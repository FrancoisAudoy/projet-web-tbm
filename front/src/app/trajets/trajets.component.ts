import { Component, OnInit } from '@angular/core';
import { Arret, Trajet } from '../arret';

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})
export class TrajetsComponent implements OnInit {
  ARRETS: Arret[] = [
    { id: 1, name: "Chemin Bon Air", line: "bus", lineName: "34", type: "corol" },
    { id: 2, name: "Stade Cruchon", line: "bus", lineName: "34", type: "corol" },
    { id: 3, name: "Les Menhirs", line: "bus", lineName: "34", type: "corol" },
    { id: 4, name: "Lycée Pape Clément", line: "bus", lineName: "34", type: "corol" },
    { id: 5, name: "Pont de l'Orient", line: "bus", lineName: "34", type: "corol" },
    { id: 6, name: "Ste Marie", line: "bus", lineName: "34", type: "corol" },
    { id: 7, name: "arts et métier", line: "bus", lineName: "8", type: "liane" },
    { id: 8, name: "Piscine de thouars", line: "bus", lineName: "8", type: "liane" }
  ];

 private line: Trajet[];

  constructor() {
    this.line = [
      {
        liste: [
          { id: 1, name: "Chemin Bon Air", line: "bus", lineName: "34", type: "corol" },
          { id: 2, name: "Stade Cruchon", line: "bus", lineName: "34", type: "corol" },
          { id: 3, name: "Les Menhirs", line: "bus", lineName: "34", type: "corol" }
        ]
      },
      {
        liste: [
          { id: 4, name: "Lycée Pape Clément", line: "bus", lineName: "34", type: "corol" },
          { id: 5, name: "Pont de l'Orient", line: "bus", lineName: "34", type: "corol" },
          { id: 6, name: "Ste Marie", line: "bus", lineName: "34", type: "corol" },
          { id: 7, name: "arts et métier", line: "bus", lineName: "8", type: "liane" },
          { id: 8, name: "Piscine de thouars", line: "bus", lineName: "8", type: "liane" }
        ]
      }
    ];
  }

  ngOnInit() {
  }

}
