import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Stop, AllLine, Line } from '../arret';

@Component({
  selector: 'app-dialog-bus',
  templateUrl: './dialog-stop.component.html',
  styleUrls: ['./dialog-stop.component.css']
})
export class DialogStopComponent implements OnInit {
  public line: string;
  public stop: string;
  public direction: string;
  public allLineName: string[] = [];
  public allStop: Stop[] = [];
  public allDirections: string[] = ["Aller", "Retour"];


  constructor(public dialRef: MatDialogRef<DialogStopComponent>) {
    AllLine.forEach(element => {
      if (!this.allLineName.includes(element.name))
        this.allLineName.push(element.name);
    });
  }

  lineChange() {
    let filtredStop: Line = AllLine.find(line => line.name == this.line);
    this.allStop = filtredStop.stops;

  }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialRef.close();
  }
}
