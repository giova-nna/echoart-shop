export class Produto {
    id: number;
    nome: string;
    preco: number;
    desconto: number;
    marca: string;
    estoque: number;
    valorDesconto: number;
    totalFinal: number;

    constructor(
        id: number,
        nome: string,
        preco: number,
        desconto: number,
        marca: string,
        estoque: number,
        valorDesconto: number,
        totalFinal: number,
    ) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.desconto = desconto;
        this.marca = marca;
        this.estoque = estoque;
        this.valorDesconto = 0;
        this.totalFinal = 0;
    }

}
