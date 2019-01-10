export class Stop {
  id: number;
  name: string;
  line: string; //bus, tram, vcub
  lineName: string; //34, A, ...
  type: string; // corol, ...
};

export class Trip {
  liste: Stop[];
}

export var Stops: Stop[] = [
  { id: 1, name: "Chemin Bon Air", line: "bus", lineName: "34", type: "corol" },
  { id: 2, name: "Stade Cruchon", line: "bus", lineName: "34", type: "corol" },
  { id: 3, name: "Les Menhirs", line: "bus", lineName: "34", type: "corol" },
  { id: 4, name: "Lycée Pape Clément", line: "bus", lineName: "34", type: "corol" },
  { id: 5, name: "Pont de l'Orient", line: "bus", lineName: "34", type: "corol" },
  { id: 6, name: "Ste Marie", line: "bus", lineName: "34", type: "corol" },
  { id: 7, name: "arts et métier", line: "bus", lineName: "8", type: "liane" },
  { id: 8, name: "Piscine de thouars", line: "bus", lineName: "8", type: "liane" }
];