import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-gestao',
  styleUrl: './gestao.css',
  templateUrl: './gestao.html',
})
export class Gestao {
  usuario = 'Administrador';
}
