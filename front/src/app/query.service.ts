/**
 * Dans ce service seulement les requêtes sont définient
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserObject } from './UserObject';
import { map } from 'rxjs/operators';
//import * as CUB from "http://data.bordeaux-metropole.fr/api/cub.xjs?key=369BEIMSVY";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  URL = "http://localhost:3000";
  URL_Horaires = "http://data.bordeaux-metropole.fr/data.php?layer=SV_ARRET_P?key=369BEIMSVY";
  constructor(private http: HttpClient) {
    //console.log(CUB);
  }

  postNewUser(data: UserObject) {
    console.log("ça part");
    return this.http.post(this.URL + "/user/register?format=json&callback=?", JSON.stringify(data), httpOptions);
  }

  postConnectUser(user: UserObject) {
    console.log("ça part");
    return this.http.post(this.URL + "/user/login?format=json&callback=?", JSON.stringify(user), httpOptions);
  }
}
