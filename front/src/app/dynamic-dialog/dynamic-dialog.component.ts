import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Stop, Stops } from '../arret';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.css']
})
export class DynamicDialogComponent implements OnInit, AfterViewInit {

  private nbForm: number = 2;
  private formIt: any = [];

  private selectedLine: any[] = [];
  private selectedStop: any[] = [];
  private selectedDirection: any[] = [];

  private allLineName: string[] = [];
  private possibleStop: any[] = [];
  private directionPossible: string[] = ["Aller", "Retour"];

  constructor(public dialRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Stop[]) {
    this.formIt = Array(this.nbForm).fill(1).map((x, i) => i);

    for (let i: number = 0; i < this.nbForm; ++i) {
      this.selectedLine.push(undefined);
      this.selectedStop.push(undefined);
      this.selectedDirection.push(undefined);
      this.possibleStop.push({ stops: undefined });
    }
    data.forEach(el => {
      if (!this.allLineName.includes(el.lineName))
        this.allLineName.push(el.lineName);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void { }

  addForm() {
    this.nbForm++;
    this.formIt.push(this.nbForm - 1);

    this.selectedLine.push(undefined);
    this.selectedStop.push(undefined);
    this.selectedDirection.push(undefined);
    this.possibleStop.push({ stops: undefined });

  }

  onLineChange(i: number) {
    let stopFiltred = this.data.filter(x => {
      let result = x.lineName == this.selectedLine[i];
      if (this.selectedDirection[i] != undefined)
        result = result && this.selectedDirection[i] == x.direction;
      return result;
    });
    this.possibleStop[i].stops = [];
    stopFiltred.forEach(el => { this.possibleStop[i].stops.push(el.name) });

  }
}
