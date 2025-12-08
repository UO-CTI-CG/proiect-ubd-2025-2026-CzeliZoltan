import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CutomerComponent } from './cutomer.component';

const routes: Routes = [{ path: '', component: CutomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CutomerRoutingModule { }
