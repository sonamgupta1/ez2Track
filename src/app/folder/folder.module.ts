import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';


import { ReactiveFormsModule } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
import { ApiServiceProvider } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [FolderPage],
  providers: [LoaderService, ApiServiceProvider]

})
export class FolderPageModule {}





