import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterpretesUpdatePageRoutingModule } from './interpretes-update-routing.module';

import { InterpretesUpdatePage } from './interpretes-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterpretesUpdatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InterpretesUpdatePage]
})
export class InterpretesUpdatePageModule {}
