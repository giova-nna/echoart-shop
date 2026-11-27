import { Injectable } from '@angular/core';

export interface UsuarioLogado {
    id?: string;
    nome: string;
    email?: string;
    tipo: 'admin' | 'cliente'
}

@Injectable({
    providedIn: 'root',
})
export class AutenticacaoService {
    private readonly chave = 'echo_usuario_logado';

    // salva o usuario no lcoalstorage
    salvarLogin(usuario: UsuarioLogado): void {
        localStorage.setItem(this.chave, JSON.stringify(usuario))
    }

    // recupera os dados do usuario logado pelo localstorage
    // ou puxa os dados, ou retorna nulo
    recuperarUsuario(): UsuarioLogado | null {
        const dados = localStorage.getItem(this.chave);

        // se recuperou os dados, transofrma em json de novo, senao retorna nulo
        return dados ? JSON.parse(dados) : null;
    }

    // verifica se tem algo no localstorage e retorna booleano (verifica se é null mesmo)
    estaLogado(): boolean {
        return this.recuperarUsuario() !== null;
    }

    // encerra a sessão (apaga o localstorage)
    encerrar(): void {
        localStorage.removeItem(this.chave);
    }
}
