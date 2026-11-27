import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho.service';
import { ProdutoService } from '../../services/produto.service'; // pra diminuir a quantidade em estoque

@Component({
    selector: 'app-carrinho',
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './carrinho.html',
    styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
    private carrinhoService = inject(CarrinhoService);
    private http = inject(HttpClient);
    private router = inject(Router);
    private produtoService = inject(ProdutoService);

    itens: ItemCarrinho[] = [];
    cep: string = '';
    enderecoFrete: string = '';
    valorFrete: number = 0;
    freteCalculado: boolean = false;
    erroCep: string = '';

    modalFinalizadoAberto: boolean = false;

    ngOnInit(): void {
        this.atualizarLista();
    }

    atualizarLista(): void {
        this.itens = this.carrinhoService.listarItens();
    }

    alterarQuantidade(produtoId: string, delta: number): void {
        this.carrinhoService.alterarQuantidade(produtoId, delta);
        this.atualizarLista();
    }

    removerItem(produtoId: string): void {
        this.carrinhoService.removerProduto(produtoId);
        this.atualizarLista();
    }

    limparCarrinho(): void {
        if (confirm('Deseja realmente limpar todos os itens do carrinho?')) {
            this.carrinhoService.limparCarrinho();
            this.atualizarLista();
            this.valorFrete = 0;
            this.freteCalculado = false;
        }
    }

    get totalUnidades(): number {
        return this.carrinhoService.getTotalUnidades();
    }

    get subtotal(): number {
        return this.carrinhoService.getSubtotal();
    }

    get desconto(): number {
        return this.carrinhoService.getTotalDesconto();
    }

    get totalGeral(): number {
        return Math.max(0, this.subtotal - this.desconto + this.valorFrete);
    }

    calcularFrete(): void {
        const cepLimpo = this.cep.replace(/\D/g, '');
        this.erroCep = '';

        if (cepLimpo.length !== 8) {
            this.erroCep = 'Digite um CEP válido com 8 dígitos.';
            return;
        }

        // API ViaCEP (padrão dos slides de Web)
        this.http.get<any>(`https://viacep.com.br{cepLimpo}/json/`).subscribe({
            next: (dados) => {
                if (dados.erro) {
                    this.erroCep = 'CEP não encontrado.';
                    this.freteCalculado = false;
                } else {
                    this.enderecoFrete = `${dados.localidade} - ${dados.uf}`;
                    this.freteCalculado = true;

                    // Regra de frete: grátis acima de R$ 1.000, senão R$ 15 para SP e R$ 35 para outros estados
                    if (this.subtotal >= 1000) {
                        this.valorFrete = 0;
                    } else {
                        this.valorFrete = dados.uf === 'SP' ? 15.0 : 35.0;
                    }
                }
            },
            error: () => {
                this.erroCep = 'Erro ao consultar o CEP. Tente novamente.';
            },
        });
    }

    // função pra atualizar o estoque - giovanna
    atualizarEstoque(): void {
        // percorrer o this.itens
        for (const item of this.itens) {
            const produtoAtualizado = {
                // copia o produto
                ...item.produto,
                // substitui o estoque
                estoque: item.produto.estoque - item.quantidade
            }
            // envia pro editar que substitui as informações no json a partir do id
            this.produtoService.editar(produtoAtualizado).subscribe(); // subscribe pq é assincrona
            console.log(`Estoque do item ${item.produto} atualizado`)
        }
    }

    finalizarCompra(): void {
        if (this.itens.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        this.atualizarEstoque(); // chama a função e atualiza o estoque

        this.carrinhoService.limparCarrinho();
        this.atualizarLista();
        this.modalFinalizadoAberto = true;
    }

    fecharModalERedirecionar(): void {
        this.modalFinalizadoAberto = false;
        this.router.navigate(['/']);
    }
}
