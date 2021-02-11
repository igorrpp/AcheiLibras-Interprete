import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  //{
  //  path: '',
  //  redirectTo: 'login',
  //  pathMatch: 'full'
  //},

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },


  {
    path: 'logoff',
    loadChildren: () => import('./logoff/logoff.module').then(m => m.LogoffPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { àuthGuardPipe: redirectToLogin }
  },
  
  
  
  {
    path: 'cadastrar-interprete',
    loadChildren: () => import('./cadastrar-interprete/cadastrar-interprete.module').then(m => m.CadastrarInterpretePageModule)

  },
    
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesPageModule)
    , canActivate: [AngularFireAuthGuard],
    data: { àuthGuardPipe: redirectToLogin }
  },
  {
    path: 'clientes-detalhe/:id',
    loadChildren: () => import('./clientes-detalhe/clientes-detalhe.module').then(m => m.ClientesDetalhePageModule)
    , canActivate: [AngularFireAuthGuard],
    data: { àuthGuardPipe: redirectToLogin }
  },
  
  {
    path: 'recuperar-senha',
    loadChildren: () => import('./recuperar-senha/recuperar-senha.module').then(m => m.RecuperarSenhaPageModule)
  },
 
  {
    path: 'interpretes-perfil-detalhe',
    loadChildren: () => import('./interpretes-perfil-detalhe/interpretes-perfil-detalhe.module').then(m => m.InterpretesPerfilDetalhePageModule)
    , canActivate: [AngularFireAuthGuard],
    data: { àuthGuardPipe: redirectToLogin }
  },
  {
    path: 'interpretes-update/:id',
    loadChildren: () => import('./interpretes-update/interpretes-update.module').then(m => m.InterpretesUpdatePageModule)
    , canActivate: [AngularFireAuthGuard],
    data: { àuthGuardPipe: redirectToLogin }
  },
  {
    path: 'interpretes-perfil-foto/:id',
    loadChildren: () => import('./interpretes-perfil-foto/interpretes-perfil-foto.module').then(m => m.InterpretesPerfilFotoPageModule)
    , canActivate: [AngularFireAuthGuard],
    data: { àuthGuardPipe: redirectToLogin }
  },

  
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then(m => m.SobrePageModule)
    , canActivate: [AngularFireAuthGuard],
    data: { àuthGuardPipe: redirectToLogin }
  },
  
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  
 
  {
    path: 'solicitacao-agendamento/:id',
    loadChildren: () => import('./solicitacao-agendamento/solicitacao-agendamento.module').then( m => m.SolicitacaoAgendamentoPageModule)
  },
  {
    path: 'teste/:id',
    loadChildren: () => import('./teste/teste.module').then( m => m.TestePageModule)
    , canActivate: [AngularFireAuthGuard],
    data: { àuthGuardPipe: redirectToLogin }
  },



 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
