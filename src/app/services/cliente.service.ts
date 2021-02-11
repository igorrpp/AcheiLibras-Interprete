import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { from, Observable } from 'rxjs';
import { UtilService } from './ultil.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Cliente } from '../model/cliente';
import { FirebaseApp } from '@angular/fire';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  fotoBlob: any = null;

  collection: string = 'Cadastros_de_clientes';
  clientes: Observable<any[]>;
  cliente: Cliente = new Cliente();

  constructor(private http: HttpClient,
    private firestore: AngularFirestore,
    private camera: Camera,
    private util: UtilService,
    private fireStorage: AngularFireStorage,
    private fileChooser: FileChooser,
    private file: File,
    private webview: WebView,
    private fb: FirebaseApp,
    private navCtrl: NavController,
  ) { }

  // Listar solicitações de consulta
  listar2(): Observable<any> {
  
    return this.firestore.collection('RecusarOuSolicitar').snapshotChanges();
   

    
  }

  listar(): Observable<any> {
    return this.firestore.collection(this.collection).snapshotChanges();
  }

  buscaPorNome(nome: string): Observable<any> {

    // Observable -> Aguardar resposta do servidor
    return from(new Observable(observe => { // converter para Observable

      this.firestore.collection(this.collection).ref.orderBy("nome")
        .startAt(nome).startAt(nome).endAt(nome + "\uf8ff").get().then(response => {
          let lista: Cliente[] = [];
          response.docs.map(obj => {
            // será repetido para cada registro, cada registro do Firestore se chama obj
            let cliente: Cliente = new Cliente();
            cliente.setData(obj.data());// obj.payload.doc.data() -> Dados do cliente
            cliente.id = obj.id; // inserindo ID
            
             // Aqui irá recarregar as fotos, a cada pesquisa
            let ref = this.fireStorage.storage.ref().child(`/clientes-foto/${ obj.id}.jpg`);
            ref.getDownloadURL().then(url => {
             
  
              cliente.imagem = url;
            }, err => {
              cliente.imagem = 'assets/img/user.png';
            })
            lista.push(cliente); // adicionando o cliente na lista // push é adicionar
          });
          observe.next(lista);
        })
    }))
  }

  
  buscaPorId(id: string): Observable<any> {
    return this.firestore.collection
      (this.collection).doc(id).snapshotChanges();
  }

  
  atualizar(id: string, dados: any): Observable<any> {
    const observable = from(this.firestore.collection('Cadastros_de_clientes').doc(id).set(dados));
    return observable;
  }

  excluir(id: string): Observable<any> {
    const observable =
      from(this.firestore.collection('Cadastros_de_clientes').doc(`${id}`).delete());
    return observable;
  }


  buscaPorEstado(estado: string): Observable<any> {

    // Observable -> Aguardar resposta do servidor
    return from(new Observable(observe => { // converter para Observable

      this.firestore.collection(this.collection).ref.orderBy("estado")
        .startAt(estado).startAt(estado).endAt(estado + "\uf8ff").get().then(response => {
          let lista: Cliente[] = [];
          response.docs.map(obj => {
            // será repetido para cada registro, cada registro do Firestore se chama obj
            let cliente: Cliente = new Cliente();
            cliente.setData(obj.data());// obj.payload.doc.data() -> Dados do interprete
            cliente.id = obj.id; // inserindo ID

             // Aqui irá recarregar as fotos, a cada pesquisa
            let ref = this.fireStorage.storage.ref().child(`/clientes-foto/${ obj.id}.jpg`);
            ref.getDownloadURL().then(url => {
             
  
              cliente.imagem = url;
            }, err => {
              cliente.imagem = 'assets/img/user.png';
            })

            lista.push(cliente); // adicionando o interprete na lista // push é adicionar
          });
          observe.next(lista);
        })
    }))
  }


  obterFotoCamera = new Observable((observe) => {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then(imageData => {
      this.fotoBlob = 'data:image/jpeg;base64,' + imageData;
      observe.next('data:image/jpeg;base64,' + imageData);
    }, (err) => {
      observe.error(err);
    })
  });

  obterFotoArquivo = new Observable((observe) => {
    this.fileChooser.open({ "mime": "image/jpeg" }).then(uri => {


      this.file.resolveLocalFilesystemUrl(uri).then((data: any) => {

        observe.next(this.webview.convertFileSrc(data.nativeURL));

        //ler o arquivo a partir da uri gerado pelo resolveLocalFilesystemUrl

        data.file(file => {
          var reader = new FileReader();
          reader.onloadend = (encodeFile: any) => {
            var fileFinal = encodeFile.target.result;
            this.fotoBlob = fileFinal;
            // this.fotoBlob = this.util.dataUriToBlob(fileFinal);

          }
          reader.readAsDataURL(file);
        });
        // fim ler arquivo

      }).catch(e => observe.next(e));
    })
  })

  uploadFoto(nome): Observable<any> {

    let fotoBlob = this.util.dataUriToBlob(this.fotoBlob);
    let observable = from(
      this.fireStorage.storage.ref().child(`/clientes-foto/${nome}.jpg`).put(fotoBlob));
    return observable;
  }

  atualizaPerfil(uid, dados) {
    return from(new Observable(observe => {

        this.firestore.collection('Cadastros_de_clientes').doc(uid).set(dados).then(response => {
            observe.next("Atualizado com sucesso!");
        }, (err) => {
            observe.error("Erro ao atualizar!");
        })

    }));
}

buscaPerfilPorId(uid: any): Observable<any> { // uid -> authenticator
  return from(new Observable(observe => {
      this.firestore.collection('Cadastros_de_clientes').doc(uid).snapshotChanges().subscribe(response => {
          if (response.payload.exists !== false) {

              let cliente: Cliente = new Cliente();
              cliente.id = response.payload.id;
              cliente.setData(response.payload.data());
              observe.next(cliente);
          }

      }, (err) => {
          observe.error("Erro ao buscar o ID!");
      })

  }));
}

}