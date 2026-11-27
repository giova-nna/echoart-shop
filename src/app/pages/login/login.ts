import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AutenticacaoService } from '../../services/autenticacao.service';

interface Cliente {
    id: string;
    nome: string;
    email: string;
    senha: string;
}

@Component({
    imports: [FormsModule],
    selector: 'app-login',
    styleUrl: './login.css',
    templateUrl: './login.html',
})
export class Login {
    private readonly API = 'http://localhost:3000/clientes'

    constructor(private router: Router, private http: HttpClient, private autenticacaoService: AutenticacaoService) { };

    login: string = "";
    senha: string = "";
    erroLogin: string = '';
    botaoDesabilitado: boolean = true;

    // valida se o botao está ativo ou não
    habilitarBotao() {
        if (this.login.trim() !== '' && this.senha.trim() !== '') {
            this.botaoDesabilitado = false;
        } else {
            this.botaoDesabilitado = true;
        }
    }

    fazerLogin() {

        // buscar os clientes do json
        this.http.get<Cliente[]>(this.API).subscribe({
            next: (clientes) => {
                const clienteEncontrado = clientes.find(cliente => cliente.email.toLowerCase() === this.login.trim().toLowerCase() && cliente.senha === this.senha);


                // verifica e da boas vindas
                if (clienteEncontrado) {

                    // salva como cliente no localstorage
                    this.autenticacaoService.salvarLogin({
                        id: clienteEncontrado.id,
                        nome: clienteEncontrado.nome,
                        email: clienteEncontrado.email,
                        tipo: 'cliente'
                    })

                    alert(`Bem vindo(a), ${clienteEncontrado.nome}.`);
                    this.router.navigate(['/']);

                } else if (this.login === 'admin' && this.senha === 'admin') { // mantem  o login de adm - pra não precisar adionar o adm como cliente 

                    // salva no localstorage
                    this.autenticacaoService.salvarLogin({
                        nome: 'admin',
                        tipo: 'admin'
                    });

                    alert(`Logado como: ${this.login}!`);
                    this.router.navigate(['/gestao']);

                } else {
                    //validações pós botao ativo
                    var posArroba = this.login.indexOf("@");
                    var posPonto = this.login.indexOf(".")

                    if (posArroba < 1 || posPonto < posArroba + 2 || posPonto + 2 > this.login.length) {
                        alert('Digite um e-mail válido.')
                    } else if (this.senha.length < 6) {
                        alert('Digite uma senha válida.');
                    } else {
                        alert('E-mail ou senha inválidos. Tente novamente.');
                    }


                }
            },
            error: (erro) => {
                alert('Não foi possível realizar o login. Tente novamente.');
            }
        })



        // else {
        //     if (this.login.includes('@')) {
        //         alert('Olá, cliente!');
        //         this.router.navigate(['/carrinho']);
        //     } else {
        //         alert('Dados inválidos. Tente novamente.')
        //     }
        // }

    }

}
