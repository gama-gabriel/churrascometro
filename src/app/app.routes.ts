import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosCadastroComponent } from './pages/produtos-cadastro/produtos-cadastro.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ChurrascosComponent } from './pages/churrascos/churrascos.component';
import { ChurrascosCadastroComponent } from './pages/churrascos-cadastro/churrascos-cadastro.component';
import { ChurrascosDetalhesComponent } from './pages/churrascos-detalhes/churrascos-detalhes.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Churrascômetro - Home'
  },
  {
    path: 'produtos',
    children: [
      {
        path: '',
        component: ProdutosComponent,
        title: 'Churrascômetro - Produtos'
      },
      {
        path: ':tipo',
        children: [
          {
            path: '',
            component: ProdutosCadastroComponent,
            title: 'Churrascômetro - Cadastro de Produto'
          }, 
          {
            path: ':id',
            component: ProdutosCadastroComponent,
            title: 'Churrascômetro - Edição de Produto'
          }
        ]
      }
    ]
  },
  {
    path: 'churrascos',
    children: [
      {
        path: '',
        component: ChurrascosComponent,
        title: 'Churrascômetro - Churrascos'
      },
      {
        path: 'cadastro',
        component: ChurrascosCadastroComponent,
        title: 'Churrascômetro - Cadastro de Churrasco'
      },
      {
        path: ':id',
        component: ChurrascosCadastroComponent,
        title: 'Churrascômetro - Edição de Churrasco'
      },
      {
        path: 'detalhes',
        children: [
          {
            path: ':id',
            component: ChurrascosDetalhesComponent,
            title: 'Churrascômetro - Detalhes do Churrasco'
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
