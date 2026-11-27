import { Component } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    imports: [RouterLink],
    selector: 'app-header',
    styleUrl: './header.css',
    templateUrl: './header.html',
})
export class Header {
    constructor(public autenticacaoService: AutenticacaoService, private router: Router) { }
    // tive que deixar a autenticação publica pq o html consulta

    sair(): void {
        this.autenticacaoService.encerrar();
        this.router.navigate(['/']);
    }

}
