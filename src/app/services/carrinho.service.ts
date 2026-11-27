import { Injectable } from '@angular/core';
import { Produto } from '../models/Produtos';

export interface ItemCarrinho {
    produto: Produto;
    quantidade: number;
}

@Injectable({
    providedIn: 'root',
})
export class CarrinhoService {
    private readonly STORAGE_KEY = 'echo_carrinho';
    private itens: ItemCarrinho[] = [];

    constructor() {
        this.carregarDoStorage();
    }

    private carregarDoStorage(): void {
        const dados = localStorage.getItem(this.STORAGE_KEY);
        if (dados) {
            this.itens = JSON.parse(dados);
        }
    }

    private salvarNoStorage(): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.itens));
    }

    listarItens(): ItemCarrinho[] {
        return this.itens;
    }

    // Método que o Rafael e o Leo vão chamar na Home e no Modal
    adicionarProduto(produto: Produto, quantidade: number = 1): void {
        const existente = this.itens.find((item) => item.produto.id === produto.id);
        if (existente) {
            existente.quantidade += quantidade;
        } else {
            this.itens.push({ produto, quantidade });
        }
        this.salvarNoStorage();
    }

    alterarQuantidade(produtoId: string, delta: number): void {
        const index = this.itens.findIndex((item) => item.produto.id === produtoId);
        if (index !== -1) {
            this.itens[index].quantidade += delta;
            if (this.itens[index].quantidade <= 0) {
                this.itens.splice(index, 1);
            }
            this.salvarNoStorage();
        }
    }

    removerProduto(produtoId: string): void {
        this.itens = this.itens.filter((item) => item.produto.id !== produtoId);
        this.salvarNoStorage();
    }

    limparCarrinho(): void {
        this.itens = [];
        localStorage.removeItem(this.STORAGE_KEY);
    }

    getTotalUnidades(): number {
        return this.itens.reduce((total, item) => total + item.quantidade, 0);
    }

    getSubtotal(): number {
        return this.itens.reduce((total, item) => total + item.produto.preco * item.quantidade, 0);
    }

    getTotalDesconto(): number {
        return this.itens.reduce((total, item) => {
            const desc = item.produto.desconto ? (item.produto.preco * (item.produto.desconto / 100)) : 0;
            return total + desc * item.quantidade;
        }, 0);
    }
}