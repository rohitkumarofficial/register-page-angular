import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City, Country, State } from 'src/types/country';

@Injectable({
  providedIn: 'root'
})
export class RegisterRepo {

  constructor(
    private _http: HttpClient
  ) { }

  getCountries(): Observable<Country[]> {
    return this._http.get<Country[]>('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json');
  }

  getStates(): Observable<State[]> {
    return this._http.get<State[]>('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json')
  }

  getCities(): Observable<City[]> {
    return this._http.get<City[]>('assets/cities.json');
  }

}
