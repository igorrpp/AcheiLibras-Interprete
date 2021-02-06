import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../services/cliente.service';


@Component({
  selector: 'app-clientes-detalhe',
  templateUrl: './clientes-detalhe.page.html',
  styleUrls: ['./clientes-detalhe.page.scss'],
})
export class ClientesDetalhePage implements OnInit {

  imagem: any = null;
  cliente: Cliente = new Cliente();
  codigopais: string = "55";

  //SUBSTITUIR ESTE Nº PELO Nº CADASTRADO NO ID
  whatsappnumber: string = "";
  mensagem: string = "?text=Olá, te encontrei no App Achei Libras";

  constructor(
    private route: ActivatedRoute,
    private clienteServ: ClienteService,
    private navCtrl: NavController,
    private fireStorage: AngularFireStorage,
    private auth: AngularFireAuth
   
  ) { }


  ngOnInit() {
    this.route.paramMap.subscribe(url => {
      let id = url.get('id');
      this.clienteServ.buscaPorId(id).subscribe(data => {
        this.cliente = data.payload.data();
        this.cliente.id = data.payload.id as string;
        console.log(this.cliente);
        this.downloadImage();
      })
    })

  }

  downloadImage() {
    let ref = this.fireStorage.storage.ref().child(`/clientes-foto/${this.cliente.id}.jpg`)
    ref.getDownloadURL().then(url => {
      this.imagem = url;
    }, err => {
      this.imagem =
        'assets/img/user.png';
    })
  }
  zap(url) {
    this.whatsappnumber = this.cliente.telefone;
    return url = "https://wa.me/" + this.codigopais + this.whatsappnumber + this.mensagem;
  }

  chat(obj: Cliente) {
    this.navCtrl.navigateForward(['/chat/']);
  }

  calendario(obj: Cliente) {
    this.navCtrl.navigateForward(['/calendario/']);
  }
  
  detalhe(){
   
    
    this.navCtrl.navigateForward(['/solicitacao-agendamento/', this.cliente.id]);
  }

agendarRed(){

  this.navCtrl.navigateForward(['/solicitacao-agendamento/']);
}



}
