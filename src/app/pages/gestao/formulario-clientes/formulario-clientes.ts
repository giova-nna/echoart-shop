import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-formulario-clientes',
  styleUrl: './formulario-clientes.css',
  templateUrl: './formulario-clientes.html',
})
export class FormularioClientes implements OnInit {
  cliente: Cliente = {} as Cliente;
  private service = inject(ClienteService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  private route = inject(ActivatedRoute);
  clienteId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    if (this.clienteId) {
      this.service.buscarPorID(this.clienteId).subscribe({
        next: (cliente) => {
          this.cliente = cliente;
          this.cdr.markForCheck();
        },
        error: () => alert('Cliente não encontrado.')
      });
    }
  }

  salvar(): void {
    if (this.clienteId) {
      this.service.editar(this.cliente).subscribe({
        next: () => {
          alert('Cliente atualizado com sucesso!');
          this.router.navigate(['/gestao/gestao-clientes']);
        },
        error: () => alert('Erro ao atualizar cliente.')
      });
    } else {
      this.service.incluir(this.cliente).subscribe({
        next: () => {
          alert('Cliente cadastrado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: () => alert('Erro ao cadastrar cliente.')
      });
    }
  }
}