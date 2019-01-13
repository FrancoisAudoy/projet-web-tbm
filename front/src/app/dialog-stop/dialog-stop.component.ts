import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Stop } from '../arret';

@Component({
  selector: 'app-dialog-bus',
  templateUrl: './dialog-stop.component.html',
  styleUrls: ['./dialog-stop.component.css']
})
export class DialogStopComponent implements OnInit {
  private line: number;
  private stop: string;
  private direction: string;
  private lineNumber: number[] = [];
  private allStopName: string[] = [];
  private allStop: Stop [] = [];
  private allDirections: string[] = ["Aller", "Retour"];
 

  constructor(public dialRef: MatDialogRef<DialogStopComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Stop[]) {
      this.allStop = data;
    data.forEach(element => {
      if (!this.lineNumber.includes(parseInt(element.type)))
        this.lineNumber.push(parseInt(element.type));
    });
  }

  lineChange(){
    this.allStopName = [];
    let filtredStop = this.allStop.filter(x => parseInt(x.type) == this.line);

    filtredStop.forEach(element => {
      this.allStopName.push(element.name);
    });
    
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialRef.close();
  }
}
