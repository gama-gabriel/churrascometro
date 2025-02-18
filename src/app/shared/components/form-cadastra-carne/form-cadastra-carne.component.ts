import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Carne } from '../../models/carne.interface';
import { CarnesService } from '../../services/carnes.service';
import { tap } from 'rxjs';
import { PrecoMinimoDirective } from '../../validators/preco-minimo.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cadastra-carne',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    PrecoMinimoDirective
  ],
  templateUrl: './form-cadastra-carne.component.html',
  styleUrl: './form-cadastra-carne.component.scss',
})
export class FormCadastraCarneComponent {
  @Input() id!: string;
  carne: any = {};

  tipos: string[] = ['bovina', 'suína', 'ave'];

  constructor(
    private carnesService: CarnesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.carregaCarne(this.id);
    }
  }

  onSubmit(form: NgForm) {
    console.log('Valores obtidos do formulário', form.value);

    if (form.valid) { 
      let carneNova: Carne = form.value; 
      if (this.id) { 
        carneNova.id = this.id;
        this.editarCarne(carneNova.id, carneNova);
      } else {
        this.cadastrarCarne(carneNova); 
      }
    }
  }

  cadastrarCarne(carne: Carne) {
    this.carnesService
      .cadastrarCarne(carne)
      .pipe(
        tap((carneCriada: any) => {
          console.log('Carne criada', carneCriada);
          this.router.navigate(['produtos']);
        })
      )
      .subscribe();
  }

  editarCarne(id: string, carne: Carne): void {
    this.carnesService.alterarCarne(id, carne).pipe(
      tap(() => {
        this.router.navigate(['produtos']);
      })
    ).subscribe();
  }

  carregaCarne(id: string) {
    this.carnesService.pegarCarne(id).pipe(
      tap((carne: Carne) => {
        this.carne = carne; 
      })
    ).subscribe();
  }
}
