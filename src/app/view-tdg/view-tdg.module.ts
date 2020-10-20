import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTdgPageRoutingModule } from './view-tdg-routing.module';

import { ViewTdgPage } from './view-tdg.page';
import { LoaderService } from '../services/loader.service';
import { ApiServiceProvider } from '../services/api.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTdgPageRoutingModule
  ],
  declarations: [ViewTdgPage],
  providers: [LoaderService, ApiServiceProvider]
})
export class ViewTdgPageModule {}
