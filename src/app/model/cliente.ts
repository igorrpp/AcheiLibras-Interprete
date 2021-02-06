export class Cliente {
    id: string;
    cep: string;
    cpf: string;
    nome: string;
    deficiencia:string;
    username: string;
    telefone: string;
    status: string;
    cidade: string;
    estado: string;
    imagem: string;
    IDInterprete: string;
    


    setData(objFirebase: any) {
        this.cep = objFirebase.cep;
        this.cep = objFirebase.cep;
        this.cpf = objFirebase.cpf;
        this.nome = objFirebase.nome;
        this.username = objFirebase.username;
        this.deficiencia = objFirebase.deficiencia;
      
        this.telefone = objFirebase.telefone;
        this.status = objFirebase.status;
        this.cidade = objFirebase.cidade;
        this.estado = objFirebase.estado;
    }

}


