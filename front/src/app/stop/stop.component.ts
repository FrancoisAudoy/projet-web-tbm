import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Stop, Stops } from '../arret';
import { DialogStopComponent } from '../dialog-stop/dialog-stop.component';
import { ScriptService } from '../script-service.service';

declare var CUB: any;

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css']
})
export class StopComponent implements OnInit {

  SelectedStop: Stop[] = [];
  URL: string = 'https://data.bordeaux-metropole.fr/csv?key=369BEIMSVY';
  constructor(public dialRef: MatDialog, private scriptService: ScriptService) {
    /*this.scriptService.load('ApiCUB', 'Jquery').then(data => {
      CUB.ready(function () {
        CUB.init('zone-carte');
        CUB.disable();
        let transport = new CUB.Layer.Processing('Temps Reel', URL, { process: 'SV_CHEM_A' });
        console.log("CUB is ready");
      });

    });*/
  }

  ngOnInit() {
  }

  openDialog() {
    console.log("toto");
    const diagRef = this.dialRef.open(DialogStopComponent, {
      width: '250px',
      data: Stops
    });

    diagRef.afterClosed().subscribe((arret) => {
      if (arret.lineName != undefined && arret.name != undefined) {
        let _stop = Stops.find(stop => stop.name === arret.name && stop.lineName === arret.lineName);

        if (_stop != undefined)
          this.SelectedStop.push(_stop);
      }
    });
  }
}