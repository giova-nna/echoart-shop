import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
    itensMenu = [
        { label: 'Cordas', link: '', icon: 'violao' },
        { label: 'Bateria e Percussão', link: '', icon: 'baqueta' },
        { label: 'Teclas', link: '', icon: 'piano' },
        { label: 'Sopro', link: '', icon: 'flauta' },
        { label: 'Áudio', link: '', icon: 'headphone' },
    ]
}
