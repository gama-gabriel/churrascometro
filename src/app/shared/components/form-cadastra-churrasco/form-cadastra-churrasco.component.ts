import { Component, inject, Input } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarnesService } from '../../services/carnes.service';
import { BebidasService } from '../../services/bebidas.service';
import { Bebida } from '../../models/bebida.interface';
import { tap } from 'rxjs';
import { Carne } from '../../models/carne.interface';
import { Churrasco } from '../../models/churrasco.interface';
import { ChurrascoService } from '../../services/churrasco.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-cadastra-churrasco',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-cadastra-churrasco.component.html',
  styleUrl: './form-cadastra-churrasco.component.scss',
})
export class FormCadastraChurrascoComponent {
  @Input() id!: string;

  pessoasForm!: FormGroup;
  carnesForm!: FormGroup;
  bebidasForm!: FormGroup;

  carnesLista: Carne[] = [];
  bebidasLista: Bebida[] = [];

  carnesSelecionadas!: string[];
  bebidasSelecionadas!: string[];

  adultos_total: number = 0;
  criancas_total: number = 0;

  valor_total: number = 0;

  churrasco: Churrasco = {
    nome: '',
    quantidade_adultos: 0,
    quantidade_criancas: 0,
    carnes: [],
    bebidas: []
  };

  exibirResultados = false;

  constructor(
    private formBuilder: FormBuilder,
    private carnesService: CarnesService,
    private bebidasService: BebidasService,
    private churrascoService: ChurrascoService,
    private router: Router
  ) {
    this.pessoasForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      quantidade_adultos: [null, [Validators.required, Validators.min(1)]],
      quantidade_criancas: [null],
    });

    this.carnesForm = this.formBuilder.group({});
    this.bebidasForm = this.formBuilder.group({});

    this.carregaCarnesNoFormulario();
    this.carregaBebidasNoFormulario();
  }
  
  ngOnInit(): void {
    if (this.id) {
      this.carregaChurrasco(this.id);
    }
  }

  private carregaCarnesNoFormulario(): void {
    this.carnesService.listarCarnes().pipe(
      tap((carnes: Carne[]) => {
        this.carnesLista = carnes; 
        this.carnesLista.forEach((carne: Carne) => {
          this.addCampoFormulario(this.carnesForm, carne.nome);
        })
      })).subscribe();
  }

  private carregaBebidasNoFormulario(): void {
    this.bebidasService.listarBebidas().pipe(
      tap((bebidas: Bebida[]) => {
        this.bebidasLista = bebidas; 
        this.bebidasLista.forEach((bebida: Bebida) => {
          this.addCampoFormulario(this.bebidasForm, bebida.nome);
        })
      })).subscribe();
  }

  carregaChurrasco(id: string) {
    this.churrascoService.pegarChurrasco(id).pipe(
      tap((churrasco: Churrasco) => {
        this.churrasco = churrasco; 
      })
    ).subscribe();
  }
  private addCampoFormulario(form: FormGroup, nome: string): void {
    form.addControl(nome, new FormControl(null));
  }

  calcularECadastrarChurrasco(): void {
    if (this.pessoasForm.valid 
      && this.carnesForm.valid 
      && this.bebidasForm.valid) 
      {
        const formPessoasValues = this.pessoasForm.value;
        this.churrasco = {
          nome: '',
          quantidade_adultos: 0,
          quantidade_criancas: 0,
          carnes: [],
          bebidas: []
        };

        this.carnesSelecionadas = [];
        this.bebidasSelecionadas = [];

        this.adultos_total = formPessoasValues.quantidade_adultos;
        this.criancas_total = formPessoasValues.quantidade_criancas;

        this.churrasco.nome = formPessoasValues.nome;

        const formCarnesValuesObject = this.carnesForm.value;

        Object.entries(formCarnesValuesObject).forEach(([nomeCarne, valorCheckbox]) => {
          if (valorCheckbox) {
            this.carnesSelecionadas.push(nomeCarne);
          }
        })

        const formBebidasValuesObject = this.bebidasForm.value;

        Object.entries(formBebidasValuesObject).forEach(([nomeBebida, valorCheckbox]) => {
          if (valorCheckbox) {
            this.bebidasSelecionadas.push(nomeBebida);
          }
        })

        if (this.id) { 
          this.churrasco.id = this.id;
          this.editarChurras(this.churrasco.id, this.churrasco); 
          this.valor_total = this.calculaValorTotal();
        } else {
          this.cadastrarChurras(this.churrasco); 
          this.valor_total = this.calculaValorTotal();
        }
      }
  }

  calculaValorTotal(): number {
    let valor_total = 0;

    this.carnesLista.forEach((carne: Carne) => {
      if (this.carnesSelecionadas.includes(carne.nome)) {
        valor_total += this.calculaValorPorProduto(
          this.adultos_total,
          this.criancas_total,
          carne.consumo_medio_adulto_g,
          carne.consumo_medio_crianca_g,
          carne.preco_kg
        );
      }
    });

    this.bebidasLista.forEach((bebida: Bebida) => {
      if (this.bebidasSelecionadas.includes(bebida.nome)) {
        valor_total += this.calculaValorPorProduto(
          this.adultos_total,
          this.criancas_total,
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

  editarChurras(id: string, churrasco: Churrasco): void {
    churrasco.quantidade_adultos = this.adultos_total;
    churrasco.quantidade_criancas = this.criancas_total;

    this.bebidasLista.forEach((bebida: Bebida) => {
      if (this.bebidasSelecionadas.includes(bebida.nome)) {
        churrasco.bebidas.push(bebida);
      }
    });

    this.carnesLista.forEach((carne: Carne) => {
      if (this.carnesSelecionadas.includes(carne.nome)) {
        churrasco.carnes.push(carne);
      }
    });


    this.churrascoService.alterarChurrasco(id, churrasco).pipe(
      tap(() => {
        // this.router.navigate(['produtos']);
        this.exibirResultados = true;
      })
    ).subscribe();
  }

  cadastrarChurras(churrasco: Churrasco): void {
    churrasco.quantidade_adultos = this.adultos_total;
    churrasco.quantidade_criancas = this.criancas_total;

    this.bebidasLista.forEach((bebida: Bebida) => {
      if (this.bebidasSelecionadas.includes(bebida.nome)) {
        churrasco.bebidas.push(bebida);
      }
    });

    this.carnesLista.forEach((carne: Carne) => {
      if (this.carnesSelecionadas.includes(carne.nome)) {
        churrasco.carnes.push(carne);
      }
    });

    this.churrascoService.cadastrarChurrasco(churrasco).pipe(
      tap(() => {
        this.exibirResultados = true;
      })
    ).subscribe();
  }

  irAoMenu(): void {
    this.router.navigate(['churrascos']);
  } 

  cadastrarNovoChurrasco(): void {
    window.location.href = '/churrascos/cadastro';
  } 
}
