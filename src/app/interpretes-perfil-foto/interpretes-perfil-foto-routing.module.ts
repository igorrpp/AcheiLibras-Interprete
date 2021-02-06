import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterpretesPerfilFotoPage } from './interpretes-perfil-foto.page';

const routes: Routes = [
  {
    path: '',
    component: InterpretesPerfilFotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterpretesPerfilFotoPageRoutingModule {}
