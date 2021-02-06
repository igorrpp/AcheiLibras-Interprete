import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { Interprete } from '../model/interprete';
import { InterpreteService } from '../services/interprete.service';
import { TemplateService } from '../services/template.service';


@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente();
  interprete: Interprete = new Interprete();

  constructor(
    private interpreteServ: InterpreteService,
    private template: TemplateService,
    private navCtrl: NavController,
    private fb: FirebaseApp,
    private auth: AngularFireAuth

  ) { }

  ngOnInit() {

   /* this.auth.onAuthStateChanged(function(user){
      if(user){
        console.log(user);
        console.log(user);
        console.log(user);
        
      } else {

      }
    })
*/

const user = this.fb.auth().currentUser;
var uid;

if (user != null) {
  this.interprete.id = user.uid;
  console.log(this.interprete.id);
  console.log(this.interprete.id);
  console.log(this.interprete.id);
  
  
  
} else {
  console.log('Deu ruim!!');
  
}
  }

  ionViewWillEnter() {
    this.clientes = [];


    this.template.loading.then(load => {
      load.present();
      this.interpreteServ.listar2(this.interprete.id).subscribe(data => {
        data.map(i => {
          let cliente: Cliente = i.payload.doc.data() as Cliente;
          cliente.id = i.payload.doc.id as string;
          console.log(cliente.id);
          
          this.clientes.push(cliente);
        })
      })

      load.dismiss();

    })

  };

  detalhe(obj: Cliente) {
    this.navCtrl.navigateForward(['/clientes-detalhe/', obj.id]);
  }



}
