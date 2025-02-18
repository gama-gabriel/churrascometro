import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Churrasco } from '../../models/churrasco.interface';
import { ChurrascoService } from '../../services/churrasco.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Bebida } from '../../models/bebida.interface';
import { Carne } from '../../models/carne.interface';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-churrasco',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './lista-churrasco.component.html',
  styleUrl: './lista-churrasco.component.scss'
})
export class ListaChurrascoComponent {
  churrascos!: Churrasco[];

  readonly dialog = inject(MatDialog);

  constructor(private churrascoService: ChurrascoService, private router: Router) { }

  openDialog(churrasco: Churrasco): void {
    this.dialog.open(DialogExcluirChurrasco, {
      width: '400px',
      data: { churrasco: churrasco }
    });
  }
  ngOnInit(): void {
    this.carregaChurrascos();
  }

  carregaChurrascos(): void {
    this.churrascoService
      .listarChurrascos()
      .pipe(
        tap((churrascos: Churrasco[]) => {
          this.churrascos = churrascos;
        })
      ).subscribe();
  }

  calculaValorTotal(churrasco: Churrasco): number {
      let valor_total = 0;
  
      churrasco.carnes.forEach((carne: Carne) => {
          valor_total += this.calculaValorPorProduto(
            churrasco.quantidade_adultos,
            churrasco.quantidade_criancas,
            carne.consumo_medio_adulto_g,
            carne.consumo_medio_crianca_g,
            carne.preco_kg);
      });
  
      churrasco.bebidas.forEach((bebida: Bebida) => {
          valor_total += this.calculaValorPorProduto(
            churrasco.quantidade_adultos,
            churrasco.quantidade_criancas,
            bebida.consumo_medio_adulto_ml,
            bebida.consumo_medio_crianca_ml,
            bebida.preco_unidade
          );
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

  goToEditarChurrasco(churrasco: Churrasco): void {
    if (churrasco.id) {
      this.router.navigate(['churrascos', churrasco.id]);
    }
  }

  goToDetalhesChurrasco(churrasco: Churrasco): void {
    if (churrasco.id) {
      this.router.navigate(['churrascos', 'detalhes', churrasco.id]);
    }
  }
}

@Component({
  selector: 'app-dialog-excluir-churrasco',
  templateUrl: 'dialog-excluir.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogExcluirChurrasco {
  readonly dialogRef = inject(MatDialogRef<DialogExcluirChurrasco>);
  data = inject(MAT_DIALOG_DATA);

  constructor(private churrascoService: ChurrascoService, private router: Router) {}

  excluirProduto(churrasco: Churrasco) {
    if (churrasco.id) {
      this.churrascoService.excluirChurrasco(churrasco.id).subscribe(() => {
        window.location.reload();
      });
    }
  }

}