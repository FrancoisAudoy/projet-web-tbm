export class Stop {
  id: string;
  name: string;
  type: string; //bus, tram, vcub
  line: string[]; //34, A, ...
  direction: string;
};

export class Line{
  id: string;
  name: string;
  stops: Stop[] = [];
}

export class Trip {
  liste: Stop[];
}

export var AllLine:Line[] = [];

export var Stops: Stop[] = [
  /*{ id: "1", name: "Chemin Bon Air", type: "bus", line: "34", direction : "aller" },
  { id: "2", name: "Stade Cruchon", type: "bus", line: "34", direction : "aller" },
  { id: "3", name: "Les Menhirs", type: "bus", line: "34", direction : "aller" },
  { id: "4", name: "Lycée Pape Clément", type: "bus", line: "34", direction : "aller" },
  { id: "5", name: "Pont de l'Orient", type: "bus", line: "34", direction : "aller" },
  { id: "6", name: "Ste Marie", type: "bus", line: "34", direction : "aller" },
  { id: "7", name: "arts et métier", type: "bus", line: "8", direction : "aller" },
  { id: "8", name: "Piscine de thouars", type: "bus", line: "8", direction : "aller" }*/
];