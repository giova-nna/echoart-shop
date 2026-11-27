import { Injectable } from '@angular/core';
import { Produto } from '../models/Produtos';
import { HttpClient } from '@angular/common/http'; // permite fazer chamadas http
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class ProdutoService {
    private readonly API = 'http://localhost:3000/produtos' // busca no endereço da api
    //private: só pode ser acessado nesse classe
    // readonly: valor nao pode ser alterado depois de inciar

    // localhost: máquina local de acesso
    // 3000: porta padrão do json-server
    // /produtos: banco de dados json acessado

    constructor(private http: HttpClient) { } // inicia variáveis e dependências - é o que permite fazer get, post etc

    // de todos os seguintes, esse é o único que retorna uma lista []
    listar(): Observable<Produto[]> { // puxa a lista de clientes de forma assíncrona
        return this.http.get<Produto[]>(this.API);
    }

    incluir(produto: Produto): Observable<Produto> {
        console.log(`Enviando produto ${produto} para inclusão.`);
        return this.http.post<Produto>(this.API, produto);
    }

    // de todos, único que não retorna valor (void)
    excluir(id: string): Observable<void> {
        return this.http.delete<void>(`${this.API}/${id}`)
    }

    buscarPorID(id: string): Observable<Produto> {
        return this.http.get<Produto>(`${this.API}/${id}`)
    }

    editar(produto: Produto): Observable<Produto> {
        return this.http.put<Produto>(`${this.API}/${produto.id}`, produto)
    }

}
