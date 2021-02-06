import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarInterpretePageRoutingModule } from './cadastrar-interprete-routing.module';

import { CadastrarInterpretePage } from './cadastrar-interprete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarInterpretePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CadastrarInterpretePage]
})
export class CadastrarInterpretePageModule {}
