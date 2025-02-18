import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CarnesService } from '../../services/carnes.service';
import { BebidasService } from '../../services/bebidas.service';
import { tap } from 'rxjs';
import { Carne } from '../../models/carne.interface';
import { Bebida } from '../../models/bebida.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-produto',
  standalone: true,
  imports: [ CommonModule, MatIconModule ],
  templateUrl: './lista-produto.component.html',
  styleUrl: './lista-produto.component.scss'
})
export class ListaProdutoComponent {
  produtos!: any;

  @Input() tipo!: string;
  
  readonly dialog = inject(MatDialog);

  constructor(
    private carnesService: CarnesService,
    private bebidasService: BebidasService,
    private router: Router
  ) { }

  openDialog(produto: Carne | Bebida): void {
    this.dialog.open(DialogExcluir, {
      width: '400px',
      data: { produto: produto, tipo: this.tipo }
    });
  }

  ngOnInit(): void {
    this.carregaProdutos(this.tipo);    
  }

  carregaProdutos(tipo: string): void {
    if (tipo === 'carnes') {
      this.carregaCarnes();
    } else if (tipo === 'bebidas') {
      this.carregaBebidas();
    }
  }

  carregaCarnes(): void {
    this.carnesService.listarCarnes().pipe(
      tap((carnes: Carne[]) => {
        this.produtos = carnes;
      })
    ).subscribe();
  }

  carregaBebidas(): void {
    this.bebidasService.listarBebidas().pipe(
      tap((bebidas: Bebida[]) => {
        this.produtos = bebidas;
      })
    ).subscribe();
  }

  goToEditarProduto(tipo: string,id: string): void {
    this.router.navigate(['produtos', tipo, id]);
  }

}

@Component({
  selector: 'app-dialog-excluir-produto',
  templateUrl: 'dialog-excluir.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogExcluir {
  readonly dialogRef = inject(MatDialogRef<DialogExcluir>);
  data = inject(MAT_DIALOG_DATA);

  constructor(private carnesService: CarnesService, private bebidasService: BebidasService, private router: Router) {}

  excluirProduto(tipo: string, produto: Carne | Bebida) {
  if (produto.id) {
    if (tipo === "carnes") {
      this.carnesService.excluirCarne(produto.id).subscribe(() => {
        window.location.reload();
      });
    } else if (tipo === "bebidas") {
      this.bebidasService.excluirBebida(produto.id).subscribe(() => {
        window.location.reload();
      });
    }
  }
    
  }
}