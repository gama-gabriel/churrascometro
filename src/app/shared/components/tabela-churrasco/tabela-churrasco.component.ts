import { Component, Input } from '@angular/core';
import { ChurrascoService } from '../../services/churrasco.service';
import { tap } from 'rxjs';
import { Churrasco } from '../../models/churrasco.interface';
import { CommonModule } from '@angular/common';
import { BebidasService } from '../../services/bebidas.service';
import { CarnesService } from '../../services/carnes.service';
import { Carne } from '../../models/carne.interface';
import { Bebida } from '../../models/bebida.interface';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tabela-churrasco',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './tabela-churrasco.component.html',
  styleUrl: './tabela-churrasco.component.scss'
})
export class TabelaChurrascoComponent {
  @Input() id!: string;

  churrasco: Churrasco = {
    nome: '',
    quantidade_adultos: 0,
    quantidade_criancas: 0,
    carnes: [],
    bebidas: []
  };

  carnesLista: Carne[] = [];
  bebidasLista: Bebida[] = [];

  constructor(private router: Router, private churrascoService: ChurrascoService, private bebidasService: BebidasService, private carnesService: CarnesService) {
    this.carregaCarnes();
    this.carregaBebidas();
  }

  ngOnInit(): void {
    if (this.id) {
      this.carregaChurrasco(this.id);
    }
  }

  private carregaCarnes(): void {
    this.carnesService.listarCarnes().pipe(
      tap((carnes: Carne[]) => {
        this.carnesLista = carnes; 
      })).subscribe();
  }

  private carregaBebidas(): void {
    this.bebidasService.listarBebidas().pipe(
      tap((bebidas: Bebida[]) => {
        this.bebidasLista = bebidas; 
      })).subscribe();
  }

  carregaChurrasco(id: string) {
    this.churrascoService.pegarChurrasco(id).pipe(
      tap((churrasco: Churrasco) => {
        this.churrasco = churrasco; 
      })
    ).subscribe();
  }

  calculaValorTotal(): number {
    let valor_total = 0;

    this.carnesLista.forEach((carne: Carne) => {
      if (this.churrasco.carnes.some(c => c.id === carne.id)) {
        valor_total += this.calculaValorPorProduto(
          this.churrasco.quantidade_adultos,
          this.churrasco.quantidade_criancas,
          carne.consumo_medio_adulto_g,
          carne.consumo_medio_crianca_g,
          carne.preco_kg
        );
      }
    });

    this.bebidasLista.forEach((bebida: Bebida) => {
      if (this.churrasco.bebidas.some(b => b.id === bebida.id)) {
        valor_total += this.calculaValorPorProduto(
          this.churrasco.quantidade_adultos,
          this.churrasco.quantidade_criancas,
          bebida.consumo_medio_adulto_ml,
          bebida.consumo_medio_crianca_ml,
          bebida.preco_unidade
        );
      }
    });
    return valor_total;
  }

  calculaValorPorProduto(
    quantAdultos: number,
    quantCriancas: number,
    consumoAdulto: number,
    consumoCrianca: number,
    precoProduto: number
  ): number {
    const consumo = quantAdultos * consumoAdulto + quantCriancas * consumoCrianca;
    return (consumo / 1000) * precoProduto;
  }

  irAoMenu(): void {
    this.router.navigate(['churrascos']);
  } 

}
