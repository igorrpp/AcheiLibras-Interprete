import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../services/cliente.service';

import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  @ViewChild("nome") nome;
  @ViewChild("estado") estado;


  // variáveis
  select_option: string;
  imagem: any = null;
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente();
  lista: Cliente[] = [];
  codImage: any = '';

  constructor(
    private clienteServ: ClienteService,
    private template: TemplateService,
    private navCtrl: NavController,
    private fireStorage: AngularFireStorage,) {
    

  }

  ngOnInit() {


  }

  ionViewWillEnter() {
    this.clientes = [];


    this.template.loading.then(load => {
      load.present();
 
      this.clienteServ.listar().subscribe(data => {


        data.map(i => {
         
          let cliente: Cliente = i.payload.doc.data() as Cliente;

          cliente.id = i.payload.doc.id as string;
        
          let ref = this.fireStorage.storage.ref().child(`/clientes-foto/${i.payload.doc.id}.jpg`);
          ref.getDownloadURL().then(url => {
           

            cliente.imagem = url;
          }, err => {
            cliente.imagem = 'assets/img/user.png';
          })

          this.clientes.push(cliente);

        })
        load.dismiss();



      })

    })

  };

  
  detalhe(obj: Cliente) {
    this.navCtrl.navigateForward(['/clientes-detalhe/', obj.id]);
  }

  pesquisar() {

    console.log("Busca por: " + this.nome.value)
    this.clienteServ.buscaPorNome(this.nome.value).subscribe(response => {

      if (this.nome.value == '') {
        this.ionViewWillEnter();

      } else {

        this.clientes = [];
        this.clientes = response;

      }


    });
  }
  teste() {

    
    
    if (document.getElementById("demo").innerHTML == 'Online') {
      document.getElementById("demo").style.color = "Blue";

    } else if (document.getElementById("demo").innerHTML == 'Offline') {
      document.getElementById("demo").style.color = "#ff0000"

    } else {
      (document.getElementById("demo").style.color = "red")
    }
    
  }

  pesquisarEstado() {
    console.log("Busca por: " + this.select_option)
    this.clienteServ.buscaPorEstado(this.select_option).subscribe(response => {


      if (this.select_option == '0') {
        this.ionViewWillEnter();

      } else {
        this.clientes = [];
        this.clientes = response;
      }


    });
  }


}
