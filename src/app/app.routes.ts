import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Carrinho } from './pages/carrinho/carrinho';
import { GestaoClientes } from './pages/gestao/gestao-clientes/gestao-clientes';
import { GestaoProdutos } from './pages/gestao/gestao-produtos/gestao-produtos';
import { Gestao } from './pages/gestao/gestao';
import { FormularioClientes } from './pages/gestao/formulario-clientes/formulario-clientes';
import { FormularioProdutos } from './pages/gestao/formulario-produtos/formulario-produtos';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'carrinho', component: Carrinho },
    { path: 'gestao', component: Gestao },
    { path: 'gestao/gestao-clientes', component: GestaoClientes },
    { path: 'gestao/formulario-clientes', component: FormularioClientes },
    { path: 'gestao/formulario-clientes/:id', component: FormularioClientes },
    { path: 'gestao/gestao-produtos', component: GestaoProdutos },
    { path: 'gestao/formulario-produtos', component: FormularioProdutos },
    { path: 'gestao/formulario-produtos/:id', component: FormularioProdutos },
];
