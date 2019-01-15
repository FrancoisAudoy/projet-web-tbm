import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Stop, AllLine, Line } from '../arret';

@Component({
  selector: 'app-dialog-bus',
  templateUrl: './dialog-stop.component.html',
  styleUrls: ['./dialog-stop.component.css']
})
export class DialogStopComponent implements OnInit {
  private line: string;
  private stop: string;
  private direction: string;
  private allLineName: string[] = [];
  private allStop: Stop[] = [];
  private allDirections: string[] = ["Aller", "Retour"];


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
