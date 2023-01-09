import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { RegisterModule } from '../register/register.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    SharedModule,
    RegisterModule,
    HttpClientModule
  ]
})
export class CoreModule { }
