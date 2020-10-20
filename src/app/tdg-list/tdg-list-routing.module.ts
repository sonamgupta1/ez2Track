import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TdgListPage } from './tdg-list.page';

const routes: Routes = [
  {
    path: '',
    component: TdgListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TdgListPageRoutingModule {}
