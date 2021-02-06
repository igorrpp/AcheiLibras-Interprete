import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Interprete } from '../model/interprete';
import { InterpreteService } from '../services/interprete.service';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-interpretes-update',
  templateUrl: './interpretes-update.page.html',
  styleUrls: ['./interpretes-update.page.scss'],
})
export class InterpretesUpdatePage implements OnInit {

  formGroup: FormGroup;
  interprete: Interprete = new Interprete();

  constructor(private formBuilder: FormBuilder,
    private InterpreteServ: InterpreteService,
    private template: TemplateService,
    private route: ActivatedRoute,
    private navCtrl: NavController,

  ) {
    this.iniciarForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(url => {
      let id = url.get('id');
      this.InterpreteServ.buscaPorId(id).subscribe(data => {
        this.interprete = data.payload.data();
        this.interprete.id = data.payload.id as string;
        this.iniciarForm();
      })
    })
  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({

      username: [this.interprete.username, [Validators.email]],
      nome: [this.interprete.nome, [Validators.required, Validators.minLength(13), Validators.maxLength(16)]],
      cpf: [this.interprete.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      cep: [this.interprete.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      estado: [this.interprete.estado, [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      cidade: [this.interprete.cidade, [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      telefone: [this.interprete.telefone, [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      status: [this.interprete.status, [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],



    })
  }
  atualizar() {

    this.InterpreteServ.atualizar(this.interprete.id, this.formGroup.value).subscribe(data => {
      console.log(data);
      this.template.loading;
      this.template.myAlert('Atualizado com sucesso');

   
      this.navCtrl.navigateForward(['/interpretes-perfil-detalhe']);



    })
  }

}