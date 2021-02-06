import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterpretesPerfilDetalhePageRoutingModule } from './interpretes-perfil-detalhe-routing.module';

import { InterpretesPerfilDetalhePage } from './interpretes-perfil-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterpretesPerfilDetalhePageRoutingModule,
    ReactiveFormsModule
  
  ],
  declarations: [InterpretesPerfilDetalhePage]
})
export class InterpretesPerfilDetalhePageModule {}
