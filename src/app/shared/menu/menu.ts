import { Component } from '@angular/core';

@Component({
    imports: [],
    selector: 'app-menu',
    styleUrl: './menu.css',
    templateUrl: './menu.html',
})
export class Menu {
    itensMenu = [
        { label: 'Cordas', icon: 'violao' },
        { label: 'Bateria e Percussão', icon: 'baqueta' },
        { label: 'Teclas', icon: 'piano' },
        { label: 'Sopro', icon: 'flauta' },
        { label: 'Áudio', icon: 'headphone' },
    ]
}
