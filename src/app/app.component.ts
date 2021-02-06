import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Button } from 'protractor';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  public appPages = [

    {
      title: 'Meu Perfil',
      url: '/interpretes-perfil-detalhe',
      icon: 'person-circle',
      

    },
    {
      title: 'clientes',
      url: '/clientes',
      icon: 'list'
    },
    
    {
      title: 'Solicitações de Consulta',
      url: '/sobre',
      icon: 'mail'
    },
   
   
   
    {

      title: 'Sair',
      url: '/logoff',
      icon: 'log-out'

    },

  ];
  /*public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];*/

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public router: Router,
    private auth: AngularFireAuth,
  ) {
    /* this.initializeApp();*/
  }
  /*
    initializeApp() {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.router.navigateByUrl('splash');
      });
    }
  */
 
  ngOnInit() {
    

    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  toggleTheme(event) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }
}
