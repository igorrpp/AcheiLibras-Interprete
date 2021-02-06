import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterpretesUpdatePage } from './interpretes-update.page';

const routes: Routes = [
  {
    path: '',
    component: InterpretesUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterpretesUpdatePageRoutingModule {}
