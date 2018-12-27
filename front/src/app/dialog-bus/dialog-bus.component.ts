import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Arret } from '../arret';

@Component({
  selector: 'app-dialog-bus',
  templateUrl: './dialog-bus.component.html',
  styleUrls: ['./dialog-bus.component.css']
})
export class DialogBusComponent implements OnInit {
  private line: number;
  private stop: string;
  private lineNumber: number[] = [];
  private allStopName: string[] = [];
  private allStop: Arret [] = [];
 

  constructor(public dialRef: MatDialogRef<DialogBusComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Arret[]) {
      this.allStop = data;
    data.forEach(element => {
      if (!this.lineNumber.includes(parseInt(element.lineName)))
        this.lineNumber.push(parseInt(element.lineName));
    });
  }

  lineChange(){
    this.allStopName = [];
    console.log("Change " + this.line);
    let filtredStop = this.allStop.filter(x => parseInt(x.lineName) == this.line);

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
