import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController } from '@ionic/angular';
import { TemplateService } from '../services/template.service';

import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private template: TemplateService,
  ) { }


  ngOnInit() {

    this.iniciarForm();
  }
  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.email]],

    })
  }

  recuperarSenha() {

    this.template.loading.then(load => {
      load.present();
     
      var email = this.auth
      var emailAddress = this.formGroup.controls['username'].value;
      email.sendPasswordResetEmail(emailAddress).then(() =>{
     
        this.template.myAlert("Enviado com sucesso!")
        load.dismiss();
      }).catch( () =>{
        load.present();
        this.template.myAlert("Email Inválido, verificar email!");
        load.dismiss();
       
       

      })
    })


  }

  

}
