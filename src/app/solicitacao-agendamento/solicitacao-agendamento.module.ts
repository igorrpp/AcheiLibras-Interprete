import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacaoAgendamentoPageRoutingModule } from './solicitacao-agendamento-routing.module';

import { SolicitacaoAgendamentoPage } from './solicitacao-agendamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacaoAgendamentoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SolicitacaoAgendamentoPage]
})
export class SolicitacaoAgendamentoPageModule {}
