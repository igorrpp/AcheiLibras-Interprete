import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-cadastrar-interprete',
  templateUrl: './cadastrar-interprete.page.html',
  styleUrls: ['./cadastrar-interprete.page.scss'],
})
export class CadastrarInterpretePage implements OnInit {
  formGroup: FormGroup;
  public teste: any = {};
  message: string = null;

  constructor(private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private template: TemplateService,
    private afs: AngularFirestore,


  ) {
    this.iniciarForm();
  }

  ngOnInit() {

    
  }
  iniciarForm() {
    this.formGroup = this.formBuilder.group({

      username: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(16)]],
      nome: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(16)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      cidade: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      estado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      telefone: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],


    })
  }


  async cadastrarUsers() {

    let user = this.formGroup.controls['username'].value;
    let pass = this.formGroup.controls['password'].value;


    try {


      const newUser = await this.auth.createUserWithEmailAndPassword(user, pass);


      await this.afs.collection('Cadastros_de_interpretes').doc(newUser.user.uid).set(this.formGroup.value).then(() => {
        this.message = "Informações cadastradas com sucesso!";
        this.formGroup.reset();
      }).catch(() => {
        this.message = "Erro ao cadastrar as Informações!";
      })
      //this.afs.collection('Users').doc(newUser.user.uid).set(teste);

      console.log('Cadastro efetuado com sucesso!');
      console.log(user);
      this.template.myAlert("Cadastrado com sucesso!");
      this.navCtrl.navigateRoot("/interpretes-perfil-detalhe")

      console.log(newUser);

    } catch (error) {
      console.error(error);


    }

  }
  autenticar() {

    let user = this.formGroup.controls['username'].value;
    let pass = this.formGroup.controls['password'].value;


    this.template.loading.then(load => {

      load.present();
      // admin2admin.com 123456

      this.auth.signInWithEmailAndPassword(user, pass).then(data => {

        load.dismiss();

        this.menuCtrl.enable(true);
        this.navCtrl.navigateRoot(['itensvencidos']);

      }).catch(data => {
        load.dismiss();
        this.template.myAlert("Usuário ou senha inválidos");

      });
    })

  }



}
