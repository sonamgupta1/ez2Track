import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EditTdgPageRoutingModule } from './edit-tdg-routing.module';

import { EditTdgPage } from './edit-tdg.page';
import { LoaderService } from '../services/loader.service';
import { ApiServiceProvider } from '../services/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditTdgPageRoutingModule
  ],
  declarations: [EditTdgPage],
  providers: [LoaderService, ApiServiceProvider]

})
export class EditTdgPageModule {}
