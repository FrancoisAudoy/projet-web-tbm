import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Stop, Stops, AllLine, Line } from '../arret';
import { QueryService } from '../query.service';
import { parseString } from 'xml2js';
import { PersonalSnackBarService } from '../personal-snack-bar.service';

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
    @Inject(MAT_DIALOG_DATA) private data: Stop[], private query: QueryService,
    private snackBar: PersonalSnackBarService) {
    this.formIt = Array(this.nbForm).fill(1).map((x, i) => i);

    for (let i: number = 0; i < this.nbForm; ++i) {
      this.selectedLine.push(undefined);
      this.selectedStop.push(undefined);
      this.selectedDirection.push(undefined);
      this.possibleStop.push({ stops: [] });
    }
    AllLine.forEach(el => {
      if (!this.allLineName.includes(el.name))
        this.allLineName.push(el.name);
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
    this.possibleStop.push({ stops: [] });

  }

  onCancelClick() {
    this.dialRef.close();
  }

  onLineChange(i: number) {
    let line = this.selectedLine[i];
    this.possibleStop[i].stops = [];

    let onlyConcernedLine: Line = AllLine.find(el => el.name == line);

    if (onlyConcernedLine != undefined)
      this.possibleStop[i].stops = onlyConcernedLine.stops;
  }
}
