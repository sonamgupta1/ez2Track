import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTdgPage } from './edit-tdg.page';

const routes: Routes = [
  {
    path: '',
    component: EditTdgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTdgPageRoutingModule {}
