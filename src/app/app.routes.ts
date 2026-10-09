import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Carrinho } from './pages/carrinho/carrinho';
import { CadastroClientes } from './pages/gestao/cadastro-clientes/cadastro-clientes';
import { ManutencaoProdutos } from './pages/gestao/manutencao-produtos/manutencao-produtos';
import { Gestao } from './pages/gestao/gestao';
import { FormularioClientes } from './pages/gestao/formulario-clientes/formulario-clientes';
import { ControleProdutos } from './pages/gestao/controle-produtos/controle-produtos';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'carrinho', component: Carrinho },
    { path: 'gestao', component: Gestao },
    { path: 'gestao/cadastro-clientes', component: CadastroClientes },
    { path: 'gestao/formulario-clientes', component: FormularioClientes },
    { path: 'gestao/manutencao-produtos', component: ManutencaoProdutos },
    { path: 'gestao/controle-produtos', component: ControleProdutos },
];
