import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { Interprete } from '../model/interprete';
import { ClienteService } from '../services/cliente.service';
import { TemplateService } from '../services/template.service';


@Component({
  selector: 'app-solicitacao-agendamento',
  templateUrl: './solicitacao-agendamento.page.html',
  styleUrls: ['./solicitacao-agendamento.page.scss'],
})
export class SolicitacaoAgendamentoPage implements OnInit {
  valor: string;
  formGroup: FormGroup;
  message: string = null;
  cliente: Cliente = new Cliente();
  interprete: Interprete = new Interprete();
  dataAgendamento:  String = new Date().toISOString();

  constructor(
    private route: ActivatedRoute,
    private clienteServ: ClienteService, 
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private template: TemplateService,
    private navCtrl: NavController,

  ) {
    this.iniciarForm();
  }


  ngOnInit() {
    this.route.paramMap.subscribe(url => {

      let id = url.get('id');
      this.clienteServ.buscaPorId(id).subscribe(data => {

        this.cliente = data.payload.data();
        
        //Id do cliente "clicado" em detalhe
        this.cliente.id = data.payload.id as string;
        console.log(this.cliente);

        // captura o id do usuario logado
        this.auth.currentUser.then(response => {

          //Id do usuário logado
          this.cliente.IDInterprete = response.uid

          this.iniciarForm();
        })

      })
    })


  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({

      horario: [''],
      dataAgendamento:  [''],
      obsAgendamento: [''],
      localAgendamento: [''],
      preco: [''],
     
      //id do interprete
      idLogado: [this.cliente.IDInterprete],

      // id do usuario logado
      id: [this.cliente.id],
      nome: [this.cliente.nome],
      

    })

  }

  cadAgendamento() {
    

    this.auth.currentUser.then(response => {
      response.uid;
      console.log(response.uid);

      try {
        //Cadastra no Id do cliente
        this.afs.collection('Cadastros_de_clientes').doc(this.cliente.id).collection('RecusarOuSolicitar').doc(response.uid).set(this.formGroup.value);

       
        //Cadastra no id do interprete
        this.afs.collection('Cadastros_de_interpretes').doc(response.uid).collection('RecusarOuSolicitar').doc(this.cliente.id).set(this.formGroup.value);
        console.log("Cadastro efetuado com sucesso!");


        this.template.myAlert("Agendamento feito!");
        this.navCtrl.navigateRoot(['/sobre']);

      } catch (error) {
        this.template.myAlert(`Agendamento não efetuado ${error}`);
        console.error(error);

      }
    }


    

    )
  }



}
