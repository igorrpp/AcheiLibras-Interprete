import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacaoAgendamentoPage } from './solicitacao-agendamento.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacaoAgendamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacaoAgendamentoPageRoutingModule {}
