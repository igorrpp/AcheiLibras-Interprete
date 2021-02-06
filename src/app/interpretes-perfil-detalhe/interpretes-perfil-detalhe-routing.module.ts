import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterpretesPerfilDetalhePage } from './interpretes-perfil-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: InterpretesPerfilDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterpretesPerfilDetalhePageRoutingModule {}
