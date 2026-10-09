import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

    login: string = "";
    senha: string = "";
    botaoDesabilitado: boolean = true;

    onBotaoClicadoRecuperarSenha() {
        alert("Que pena! Tente de novo.");
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
            alert(`Bem-vindo ${this.login}!`);
        } else {
            alert('Dados inválidos');
        }

    }

}
