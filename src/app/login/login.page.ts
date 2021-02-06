import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { TemplateService } from '../services/template.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Interprete } from '../model/interprete';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;
  interprete: Interprete = new Interprete();
  showPassword = false;
  passwordToggleIcon = 'eye';
 
 

  constructor(private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private template: TemplateService,

    
   


  ) {
    this.iniciarForm();
  }

  ngOnInit() {
  }



  async autenticar() {

    let user = this.formGroup.controls['username'].value;
    let pass = this.formGroup.controls['password'].value;


  

    this.template.loading.then(load => {

      load.present();
     

      this.auth.signInWithEmailAndPassword(user, pass).then(async data => {

        load.dismiss();

      // Constante serve para capturar o "uid" o id do firebase
        const infor = await this.auth.signInWithEmailAndPassword(user, pass);
        
        
        
        this.menuCtrl.enable(true);
        this.navCtrl.navigateRoot(['clientes']);
        console.log(user);


      }).catch(()=>{
        load.dismiss();
        this.template.myAlert("Usuário ou senha inválidos");

      });
    })

  }


  redirecionar() {
    this.navCtrl.navigateRoot(['recuperar-senha']);

  }
  redirecionar2() {
    this.navCtrl.navigateRoot(['cadastrar-interprete']);

  }

  iniciarForm() {

    //login == denis@ig.com
    //Senha == 123456 
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    })
  }

  togglePassword():void {
    this.showPassword = !this.showPassword;
  }
}
