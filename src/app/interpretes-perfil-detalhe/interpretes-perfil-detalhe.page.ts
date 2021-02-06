import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Interprete } from '../model/interprete';
import { InterpreteService } from '../services/interprete.service';

@Component({
  selector: 'app-interpretes-perfil-detalhe',
  templateUrl: './interpretes-perfil-detalhe.page.html',
  styleUrls: ['./interpretes-perfil-detalhe.page.scss'],
})
export class InterpretesPerfilDetalhePage implements OnInit {
  id: any = '';
  imagem: any = null;
  interprete: Interprete = new Interprete();
  formGroup: FormGroup;

  constructor(
    private interpreteServ: InterpreteService,
    private fireStorage: AngularFireStorage,
    private navCtrl: NavController,  
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    


  ) { 
    this.iniciarForm();
    this.auth.currentUser.then(response=> {
      this.interpreteServ.buscaPerfilPorId(response.uid).subscribe(response=>{
        this.interprete = response;
        this.iniciarForm();
        this.downloadImage()
      })
    })
  }


  ngOnInit() {
   
  }
  downloadImage() {
    // código para receber o id do usuário logado

    this.auth.currentUser.then(response=> {
    let ref = this.fireStorage.storage.ref().child(`/interpretes-foto/${response.uid}.jpg`)
    ref.getDownloadURL().then(url => {
      this.imagem = url;


    }, err => {
      this.imagem =
        'assets/img/user.png';
    })
  })
  }

  atualizar() {
    this.auth.currentUser.then(response=>{

    this.navCtrl.navigateForward(['/interpretes-update', response.uid]);
  })
  }

  foto() {
    this.navCtrl.navigateForward(['/interpretes-perfil-foto', this.interprete.id]);
  }

  /* função para excluir "Perfil do usuário" tanto no Auth quando na colleção
  excluir2(id: string) {

    var user = firebase.auth().currentUser;

    user.delete().then(function () {
      this.interpreteServ.excluir(this.interprete.id).subscribe(data => {
        this.navCtrl.navigateRoot('login');
      })
    }).catch(function (error) {
      console.log(`Erro ao cadastrar ${error}`);

    });
  }
*/

  iniciarForm() {
    
    this.formGroup = this.formBuilder.group({

      status: [this.interprete.status],
      username: [this.interprete.username],
      nome: [this.interprete.nome],
      grupo: [this.interprete.grupo],
      cpf: [this.interprete.cpf],
      cep: [this.interprete.cep],
      telefone: [this.interprete.telefone],
      cidade: [this.interprete.cidade],
      estado: [this.interprete.estado],
      })
    }
    
    atualizar2(){
    
      this.auth.currentUser.then(response=>{ // auth.currentUser -> Obten dados do usuario
        // envio uid -> idUsuário
        // this.formGroup.value -> Dados preenchidos nos campos
        this.interpreteServ.atualizaPerfil(response.uid,this.formGroup.value).subscribe(response=>{
          console.log(response);
          console.log(this.formGroup.value  )
        })
      })
    }
  
  
}
