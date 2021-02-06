import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';


@Injectable({
    providedIn: 'root',
})
export class TemplateService {


    constructor(private http: HttpClient,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {

    }

    loading = this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Carregando...',
        duration: 2000
    });

    myAlert(texto : string){
        let alert = this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: 'Mensagem',
          subHeader: '',
          message: texto,
          buttons: ['CONFIRMAR']
    });

    alert.then(data=>{
        data.present();
    })
    
}
}