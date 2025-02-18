import { Component, inject } from '@angular/core';
import { ListaProdutoComponent } from '../../shared/components/lista-produto/lista-produto.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [ ListaProdutoComponent, MatButtonModule ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {

  router: Router = inject(Router)

  goToCadastraProduto(tipo: string): void {
    this.router.navigate(['produtos', tipo]);
  }
}
