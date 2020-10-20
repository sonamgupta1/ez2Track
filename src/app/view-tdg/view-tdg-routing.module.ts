import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTdgPage } from './view-tdg.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTdgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTdgPageRoutingModule {}
