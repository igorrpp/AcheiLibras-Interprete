import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {
  valor: string;
  formGroup: FormGroup;
  message: string = null;
  cliente: Cliente = new Cliente();

  constructor(
    private route: ActivatedRoute,
    private clienteServ: ClienteService, 
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,

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

      dataAgendamento: [''],
      obsAgendamento: [''],
      localAgendamento: [''],
      intLogado: [this.cliente.IDInterprete],
      id: [this.cliente.id]






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

      } catch (error) {
        console.error(error);

      }
    }


    

    )
  }



}
