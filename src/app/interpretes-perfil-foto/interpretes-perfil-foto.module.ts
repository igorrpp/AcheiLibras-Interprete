import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterpretesPerfilFotoPageRoutingModule } from './interpretes-perfil-foto-routing.module';

import { InterpretesPerfilFotoPage } from './interpretes-perfil-foto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterpretesPerfilFotoPageRoutingModule
  ],
  declarations: [InterpretesPerfilFotoPage]
})
export class InterpretesPerfilFotoPageModule {}
