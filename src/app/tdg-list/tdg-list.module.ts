import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TdgListPageRoutingModule } from './tdg-list-routing.module';

import { TdgListPage } from './tdg-list.page';
import { NetworkService, ConnectionStatus } from '../services/network.service';
import { LoaderService } from '../services/loader.service';
import { ApiServiceProvider } from '../services/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TdgListPageRoutingModule
  ],
  declarations: [TdgListPage],
  providers: [NetworkService, LoaderService, ApiServiceProvider]
})
export class TdgListPageModule {}
