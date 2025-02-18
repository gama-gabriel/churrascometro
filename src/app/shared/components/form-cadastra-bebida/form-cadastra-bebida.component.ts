import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BebidasService } from '../../services/bebidas.service';
import { Bebida } from '../../models/bebida.interface';
import { tap } from 'rxjs';
import { precoMinimoValidator } from '../../validators/preco-minimo.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cadastra-bebida',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
   ],
  templateUrl: './form-cadastra-bebida.component.html',
  styleUrl: './form-cadastra-bebida.component.scss'
})
export class FormCadastraBebidaComponent {
  @Input() id!: string;

  bebidaForm!: FormGroup; 

  tipos: string[] = [
    'alcoólica',
    'não alcoólica'
  ];

  constructor(
    private builder: FormBuilder, 
    private bebidaService: BebidasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bebidaForm = this.builder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      preco_unidade: ['', [Validators.required, precoMinimoValidator(5)]],
      consumo_medio_adulto_ml: ['', Validators.required],
      consumo_medio_crianca_ml: ['', Validators.required],
    });

    if (this.id) { 
      this.carregaBebida(this.id); 
    }
  }

  onSubmit(): void {
    console.log('Valores obtidos do formulário', this.bebidaForm.value);

    if (this.bebidaForm.valid) { 
      let bebidaNova: Bebida = this.bebidaForm.value; 

      if (this.id) { 
        bebidaNova.id = this.id; 
        this.editarBebida(bebidaNova.id, bebidaNova); 
      } else {
        this.cadastrarBebida(bebidaNova); 
      }
    }
  }

  cadastrarBebida(bebida: Bebida): void {
    this.bebidaService.cadastrarBebida(bebida).pipe(
      tap((bebidaCriada: Bebida) => {
        console.log('Bebida criada com sucesso', bebidaCriada);
        this.bebidaForm.reset(); 
      })
    ).subscribe();
  }

  editarBebida(id: string, bebida: Bebida): void {
    this.bebidaService.alterarBebida(id, bebida).pipe(
      tap(() => {
        this.router.navigate(['produtos']);
      })
    ).subscribe();
  }

  carregaBebida(id: string) {
    this.bebidaService.pegarBebida(id).pipe(
      tap((bebida: Bebida) => {
        this.bebidaForm.patchValue(bebida);
      })
    ).subscribe();
  }
}
