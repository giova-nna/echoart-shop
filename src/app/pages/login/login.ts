import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

    constructor(private router: Router) { };

    login: string = "";
    senha: string = "";
    botaoDesabilitado: boolean = true;

    onBotaoClicadoRecuperarSenha() {
        alert("Que pena!");
    }

    habilitarBotao() {
        if (this.login.trim() !== '' && this.senha.trim() !== '') {
            this.botaoDesabilitado = false;
        } else {
            this.botaoDesabilitado = true;
        }
    }

    fazerLogin() {
        if (this.login === 'admin' && this.senha === 'admin') {
            alert(`Logado como: ${this.login}!`);
            this.router.navigate(['/gestao']);
        } else {
            if (this.login.includes('@')){
                alert('Olá, cliente!');
                this.router.navigate(['/carrinho']);
            } else {
                alert('Dados inválidos. Tente novamente.')
            }
        }
        
    }

}
