/**
 * Dans ce service seulement les requêtes sont définient
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserObject, QueryUserObject } from './UserObject';
import { Stop } from './arret';

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
    return this.http.post(this.URL + "/user/register?format=json&callback=?", JSON.stringify(data), httpOptions);
  }

  postConnectUser(user: UserObject) {
    return this.http.post(this.URL + "/user/login?format=json&callback=?", JSON.stringify(user), httpOptions);
  }

  putAddArret(user: QueryUserObject, stop: Stop) {
    let dataToSend = { token: user.token, stop: { id: stop.id, name: stop.name, direction: stop.direction } };
    return this.http.put(this.URL + "/user/" + user.id +"/stops?format=json&callback=?", JSON.stringify(dataToSend), httpOptions);
  }

  getAllStopFor(user: QueryUserObject) {
    //let token = { token: user.token };

    let param = new HttpParams().set("token", user.token);
    return this.http.get(this.URL + "/user/" + user.id +"/stops", { headers: httpOptions.headers, params: param});
  }
}
