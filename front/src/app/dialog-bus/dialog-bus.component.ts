import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Arret } from '../arret';

@Component({
  selector: 'app-dialog-bus',
  templateUrl: './dialog-bus.component.html',
  styleUrls: ['./dialog-bus.component.css']
})
export class DialogBusComponent implements OnInit {
  private line: string;
  private stop: string;

  constructor(public dialRef: MatDialogRef<DialogBusComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Arret) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialRef.close();
  }
}
