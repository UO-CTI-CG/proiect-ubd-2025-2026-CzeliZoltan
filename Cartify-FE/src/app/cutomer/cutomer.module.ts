import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CutomerRoutingModule } from './cutomer-routing.module';
import { CutomerComponent } from './cutomer.component';


@NgModule({
  declarations: [
    CutomerComponent
  ],
  imports: [
    CommonModule,
    CutomerRoutingModule
  ]
})
export class CutomerModule { }
