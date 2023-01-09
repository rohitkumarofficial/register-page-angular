import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';
import { RegisterRepo } from 'src/repo/register.repo';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private _registerRepo: RegisterRepo
  ) { }

  getCountries() {
    return this._registerRepo.getCountries()
      .pipe(
        filter(response => !!response.length),
        map(responses => responses.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }))
      );
  }

  getStates(countyName: string) {
    return this._registerRepo.getStates()
      .pipe(
        filter(response => !!response.length),
        map(response => response.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })),
        map(response => response.filter(state => state.country_name === countyName))
      );
  }

  getCities(stateName: string) {
    return this._registerRepo.getCities()
      .pipe(
        filter(response => !!response.length),
        map(responses => responses.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })),
        map(response => response.filter(city => city.state_name === stateName))
      );
  }
}
