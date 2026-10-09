export class Cliente {
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    dataNascimento: string;

    constructor(id: number, nome: string, sobrenome: string, cpf: string, dataNascimento: string) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }

}