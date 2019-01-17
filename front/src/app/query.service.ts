/**
 * Dans ce service seulement les requêtes sont définient
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserObject, QueryUserObject } from './UserObject';
import { Stop, Trip } from './arret';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  URL = "https://projet-web-tbm.herokuapp.com";
  constructor(private http: HttpClient) {
  }

  postNewUser(data: UserObject) {
    return this.http.post(this.URL + "/user/register?format=json&callback=?", JSON.stringify(data), httpOptions);
  }

  postConnectUser(user: UserObject) {
    return this.http.post(this.URL + "/user/login?format=json&callback=?", JSON.stringify(user), httpOptions);
  }

  putAddArret(user: QueryUserObject, stop: Stop) {
    let dataToSend = { token: user.token, stop: { id: stop.id, name: stop.name, direction: stop.direction, line: stop.line } };
    return this.http.put(this.URL + "/user/" + user.id + "/stops?format=json&callback=?", JSON.stringify(dataToSend), httpOptions);
  }

  getAllStopFor(user: QueryUserObject) {
    //let token = { token: user.token };

    let param = new HttpParams().set("token", user.token);
    return this.http.get(this.URL + "/user/" + user.id + "/stops", { headers: httpOptions.headers, params: param });
  }

  putAddTripOf(user: QueryUserObject, trip: Trip) {
    let dataToSend = { token: user.token, path: trip.liste };
    return this.http.put(this.URL + "/user/" + user.id + "/paths?format=json&callback=?", JSON.stringify(dataToSend), httpOptions);
  }

  getAllTripOf(user: QueryUserObject) {
    let param = new HttpParams().set("token", user.token);
    return this.http.get(this.URL + "/user/" + user.id + "/paths", { headers: httpOptions.headers, params: param });
  }

  getAllLineActive() {
    return this.http.get("https://data.bordeaux-metropole.fr/wps?key=369BEIMSVY&SERVICE=WPS&VERSION=1.0.0&REQUEST=EXECUTE&IDENTIFIER=SV_LIGNE_A&DATAINPUTS=filter=<Filter><And><PropertyIsEqualTo><PropertyName>ACTIVE</PropertyName><Literal>1</Literal></PropertyIsEqualTo><PropertyIsEqualTo><PropertyName>TYPE</PropertyName><Literal>BUS</Literal></PropertyIsEqualTo></And></Filter>;maxfeatures=1000",
      { responseType: 'text' });
  }

  getAllBusStopOfALine(lineName: string) {
    return this.http.get('https://data.bordeaux-metropole.fr/wfs?key=369BEIMSVY&REQUEST=GetFeature&SERVICE=WFS&VERSION=1.1.0&TYPENAME=bm:TB_ARRET_P&SRSNAME=EPSG:3945&FILTER=<Filter><And><PropertyIsEqualTo><PropertyName>RESEAU</PropertyName><Literal>BUS</Literal></PropertyIsEqualTo><PropertyIsLike wildCard="*" singleChar="." escape="!"><PropertyName>LIGNEDES</PropertyName><Literal>'
      + lineName +
      '</Literal></PropertyIsLike></And></Filter>&MAXFEATURES=20000',
      { responseType: 'text' });
  }

  getAllBusStop() {
    return this.http.get("https://data.bordeaux-metropole.fr/wfs?key=369BEIMSVY&REQUEST=GetFeature&SERVICE=WFS&VERSION=1.1.0&TYPENAME=bm:TB_ARRET_P&SRSNAME=EPSG:3945&FILTER=<Filter><PropertyIsEqualTo><PropertyName>RESEAU</PropertyName><Literal>BUS</Literal></PropertyIsEqualTo></Filter>&MAXFEATURES=4000",
      { responseType: 'text' });
  }

  deleteTrip(user: QueryUserObject, trip: Trip) {
    let dataToSend = { token: user.token, path: trip.liste };
    return this.http.request('delete', this.URL + "/user/" + user.id + "/paths?format=json&callback=?", { body: JSON.stringify(dataToSend), headers: httpOptions.headers })
  }

  deleteStop(user: QueryUserObject, stop: Stop) {
    let dataToSend = { token: user.token, stop: { id: stop.id, name: stop.name, direction: stop.direction, line: stop.line } };
    return this.http.request('delete', this.URL + "/user/" + user.id + "/stops?format=json&callback=?", { body: JSON.stringify(dataToSend), headers: httpOptions.headers });
  }

}
