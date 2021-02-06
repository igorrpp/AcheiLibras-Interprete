import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Interprete } from '../model/interprete';
import { InterpreteService } from '../services/interprete.service';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-interpretes-perfil-foto',
  templateUrl: './interpretes-perfil-foto.page.html',
  styleUrls: ['./interpretes-perfil-foto.page.scss'],
})
export class InterpretesPerfilFotoPage implements OnInit {

 
  foto: any = null;
  interprete: Interprete = new Interprete();

  fotoBlob : any = null;
  constructor( 
    private InterpreteServ: InterpreteService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private template: TemplateService

   ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(url => {

      let id = url.get('id');

      this.InterpreteServ.buscaPorId(id).subscribe(data => {
        this.interprete = data.payload.data();
        this.interprete.id = id;
        this.tirarFoto();
      }, err => {
        this.navCtrl.navigateRoot(['/interpretes-foto/']);
      })

    });
  }

  tirarFoto() {
    this.InterpreteServ.obterFotoCamera.subscribe(data => {
      this.foto = data;
    })
  }

  obterFoto() {
   
    this.InterpreteServ.obterFotoArquivo.subscribe(data => {
      this.foto = data;
    })
  }
  enviarFoto() {
    this.InterpreteServ.uploadFoto(this.interprete.id).subscribe(data => {
      console.log("Enviado");
      this.template.myAlert('Foto Enviar com sucesso!');
      this.navCtrl.navigateBack(['/interpretes-foto/', this.interprete.id])
    }, err => {
      console.log(err);
    })

    /*this.fireStorage.storage.ref().child(`/itensVencidos/${this.cliente.id}.jpg`).put(this.fotoBlob).then(data=>{
      console.log("Enviado Com sucesso!");
    });*/
  }
}