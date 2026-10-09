import { Component } from '@angular/core';

@Component({
    imports: [],
    selector: 'app-controle-produtos',
    styleUrl: './controle-produtos.css',
    templateUrl: './controle-produtos.html',
})
export class ControleProdutos {

    onBotaoClicado() {
        alert('Botão funcionando!')
    }
}
