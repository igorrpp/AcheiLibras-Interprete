import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { UtilService } from './ultil.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Interprete } from '../model/interprete';
import { FirebaseApp } from '@angular/fire';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class InterpreteService {


  fotoBlob: any = null;

  collection: string = 'Cadastros_de_interpretes';
  interpretes: Observable<any[]>;
  interprete: Interprete = new Interprete();

  constructor(private http: HttpClient,
    private firestore: AngularFirestore,
    private camera: Camera,
    private util: UtilService,
    private fireStorage: AngularFireStorage,
    private fileChooser: FileChooser,
    private file: File,
    private webview: WebView,
    private auth: AngularFireAuth,
    
  ) {   
    
  }

  


  
// 8Y1qy712xKbX4g0bOY2TQGMhly43



  listar2(teste: any): Observable<any> {
    

    
    return this.firestore.collection(this.collection).doc(teste).collection('RecusarOuSolicitar').snapshotChanges();
   

    
  }
  
  listar(): Observable<any> {
    return this.firestore.collection(this.collection).snapshotChanges();
  }



buscaPerfilPorId(uid: any): Observable<any> { // uid -> authenticator
  return from(new Observable(observe => {
      this.firestore.collection('Cadastros_de_interpretes').doc(uid).snapshotChanges().subscribe(response => {
          if (response.payload.exists !== false) {

              let interprete: Interprete = new Interprete();
              interprete.id = response.payload.id;
              interprete.setData(response.payload.data());
              observe.next(interprete);
          }

      }, (err) => {
          observe.error("Erro ao buscar o ID!");
      })

  }));
}


  buscaPorId(id: string): Observable<any> {
    return this.firestore.collection
      (this.collection).doc(id).snapshotChanges();
  }


  atualizar(id: string, dados: any): Observable<any> {
    const observable =
      from(this.firestore.collection('Cadastros_de_interpretes').doc(id).set(dados));
    return observable;
  }

  atualizar2(id: string, status: any): Observable<any> {
    const observable =
      from(this.firestore.collection('Cadastros_de_interpretes').doc(id).set(status));
    return observable;
  }

  excluir(id: string): Observable<any> {
    const observable =
      from(this.firestore.collection('Cadastros_de_interpretes').doc(`${id}`).delete());
    return observable;
  }

  excluir2(id: string): Observable<any> {
    
    const observable =
      from(this.firestore.collection('Cadastros_de_interpretes').doc(`${id}`).delete());
    return observable;


  }
  buscaPorEstado(estado: string): Observable<any> {

    // Observable -> Aguardar resposta do servidor
    return from(new Observable(observe => { // converter para Observable

      this.firestore.collection(this.collection).ref.orderBy("estado")
        .startAt(estado).startAt(estado).endAt(estado + "\uf8ff").get().then(response => {
          let lista: Interprete[] = [];
          response.docs.map(obj => {
            // será repetido para cada registro, cada registro do Firestore se chama obj
            let interprete: Interprete = new Interprete();
            interprete.setData(obj.data());// obj.payload.doc.data() -> Dados do interprete
            interprete.id = obj.id; // inserindo ID
            lista.push(interprete); // adicionando o interprete na lista // push é adicionar
          });
          observe.next(lista);
        })
    }))
  }


  buscaPorNome(nome: string): Observable<any> {

    // Observable -> Aguardar resposta do servidor
    return from(new Observable(observe => { // converter para Observable

      this.firestore.collection(this.collection).ref.orderBy("nome")
        .startAt(nome).startAt(nome).endAt(nome + "\uf8ff").get().then(response => {
          let lista: Interprete[] = [];
          response.docs.map(obj => {
            // será repetido para cada registro, cada registro do Firestore se chama obj
            let interprete: Interprete = new Interprete();
            interprete.setData(obj.data());// obj.payload.doc.data() -> Dados do cliente
            interprete.id = obj.id; // inserindo ID
            lista.push(interprete); // adicionando o cliente na lista // push é adicionar
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
      this.fireStorage.storage.ref().child(`/interpretes-foto/${nome}.jpg`).put(fotoBlob));
    return observable;
  }

  atualizaPerfil(uid, dados) {
    return from(new Observable(observe => {

        this.firestore.collection('Cadastros_de_interpretes').doc(uid).set(dados).then(response => {
            observe.next("Atualizado com sucesso!");
        }, (err) => {
            observe.error("Erro ao atualizar!");
        })

    }));
}




}