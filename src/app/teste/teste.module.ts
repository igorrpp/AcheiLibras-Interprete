import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestePageRoutingModule } from './teste-routing.module';

import { TestePage } from './teste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TestePage]
})
export class TestePageModule {}
