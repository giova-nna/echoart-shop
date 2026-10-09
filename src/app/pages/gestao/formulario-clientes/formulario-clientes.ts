import { Component } from '@angular/core';

@Component({
    imports: [],
    selector: 'app-formulario-clientes',
    styleUrl: './formulario-clientes.css',
    templateUrl: './formulario-clientes.html',
})
export class FormularioClientes {

    onBotaoClicado() {
        alert('Botão funcionando!')
    }
}
