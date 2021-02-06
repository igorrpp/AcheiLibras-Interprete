import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarInterpretePage } from './cadastrar-interprete.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarInterpretePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarInterpretePageRoutingModule {}
