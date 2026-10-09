import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../models/cliente';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-cadastro-clientes',
  styleUrl: './cadastro-clientes.css',
  templateUrl: './cadastro-clientes.html',
})
export class CadastroClientes {
  // botoes .html (alterar pro marco 2)
  onBotaoClicado() {
    alert('Botão clicado!');
  }

  // pra aparecer os nome no for do .html
  listaClientes: Cliente[] = [
    {
      id: 1,
      nome: 'Márcia',
      sobrenome: 'Silva',
      cpf: '1112223339',
      dataNascimento: '1971-10-02',
    },
    {
      id: 2,
      nome: 'Airon',
      sobrenome: 'Meiden',
      cpf: '9998887771',
      dataNascimento: '1975-12-25',
    },
    {
      id: 3,
      nome: 'Lin-ki',
      sobrenome: 'Park',
      cpf: '6665554447',
      dataNascimento: '1996-01-01',
    },
    {
      id: 4,
      nome: 'Gunse',
      sobrenome: 'Rouse',
      cpf: '3332227773',
      dataNascimento: '1985-05-05',
    },
  ];
}
