import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../_config/shared.module';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RegisterModule { }
