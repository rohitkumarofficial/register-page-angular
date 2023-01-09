import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Observable } from 'rxjs';
import { RegisterService } from 'src/services/register.service';
import { City, Country, State } from 'src/types/country';
import { emailRegex, fileNameRegex, postalCodeRegex, usernameRegex, webUrlRegex } from '../_utilites/regex';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as moment from 'moment';

export const MY_FORMATS = {
	parse: {
		dateInput: 'll',
	},
	display: {
		dateInput: 'DD-MMM-YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'll',
		monthYearA11yLabel: 'MMM YYYY',
	},
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class RegisterComponent {

  countries$: Observable<Country[]>;

  states$: Observable<State[]>;

  cities$: Observable<City[]>;

  minDate: Date = new Date();

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(12),
      Validators.pattern(usernameRegex)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(12),
      Validators.pattern(usernameRegex)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(12),
      Validators.pattern(usernameRegex)
    ]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    dob: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern(postalCodeRegex)
    ]),
    phone: new FormControl(null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    photoFileName: new FormControl('', [
      Validators.pattern(fileNameRegex)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailRegex)
    ]),
    webSiteUrl: new FormControl('', [
      Validators.required,
      Validators.pattern(webUrlRegex)
    ]),
    gender: new FormControl(''),
    country: new FormControl(null),
    state: new FormControl(null),
    city: new FormControl(null),
    terms: new FormControl(null, [Validators.required])
  }, this._passwordMatchValidator())

  constructor(
    private _registerService: RegisterService
  ) {
    this.countries$ = this._registerService.getCountries();
  }

  private _passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        formGroup.get('confirmPassword')?.setErrors({
          ...formGroup.get('confirmPassword')?.errors,
          passwordNotMatched: true
        })
      }

      return null;
    }
  }

  onCountrySelectionChange(countryName: string) {
    this.states$ = this._registerService.getStates(countryName);
    this.registerForm.get('state')?.setValue(null);
    this.registerForm.get('city')?.setValue(null);
  }

  onStateSelectionChange(stateName: string) {
    this.cities$ = this._registerService.getCities(stateName);
    this.registerForm.get('city')?.setValue(null);
  }

  onTermCheckboxChange(flag: boolean) {
    if (!flag) {
      this.registerForm.get('terms')?.setValue(null);
    }
  }

  signUp() {
    console.log({
      ...this.registerForm.value,
      dob: moment(this.registerForm.value.dob).format('DD-MMM-YYYY')
    });
  }
}
