import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CarnesService } from '../../shared/services/carnes.service';
import { tap } from 'rxjs';
import { Carne } from '../../shared/models/carne.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  carnes: any[] = [];
  carne!: any;

  carneNova: any = {
    nome: 'maminha',
    tipo: 'bovina',
    preco_kg: '45',
    consumo_medio_adulto_g: '100',
    consumo_medio_crianca_g: '50',
  };

  carneAlterada: any = {
    nome: 'maminha',
    tipo: 'bovina',
    preco_kg: '50',
    consumo_medio_adulto_g: '150',
    consumo_medio_crianca_g: '100',
  };

  carneNomeAlterado: any = {
    nome: 'maminha premium',
  };

  endpointCarnes = 'carnes';

  constructor(
    public carnesService: CarnesService, 
    private router: Router
  ) {}

  listarCarnes() {
    this.carnesService
      .listarCarnes()
      .pipe(
        tap((carnes: Carne[]) => {
          this.carnes = carnes;
        })
      )
      .subscribe();
  }

  pegarCarne(id: string) {
    this.carnesService
      .pegarCarne(id)
      .pipe(
        tap((carne: any) => {
          this.carne = carne;
        })
      )
      .subscribe();
  }

  alterarCarne(id: string, carne: any) {
    this.carnesService
      .alterarCarne(id, carne)
      .pipe(
        tap((carneAlterada: any) => {
          console.log('Carne alterada', carneAlterada);
          this.listarCarnes();
        })
      )
      .subscribe();
  }

  alterarNomeCarne(id: string, carne: any) {
    this.carnesService
      .alterarNomeCarne(id, carne)
      .pipe(
        tap((carneAlterada: any) => {
          console.log('Carne alterada', carneAlterada);
          this.listarCarnes();
        })
      )
      .subscribe();
  }

  excluirCarne(id: string) {
    this.carnesService
      .excluirCarne(id)
      .pipe(
        tap(() => {
          this.listarCarnes();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.listarCarnes();
  }

  goToCadastroProduto(tipo: string) {
    this.router.navigate(['produtos', tipo]);
  }
}
