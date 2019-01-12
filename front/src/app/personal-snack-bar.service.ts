import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class PersonalSnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string){
    this.snackBar.open(message, '', { duration: 1000 });
  }
}
