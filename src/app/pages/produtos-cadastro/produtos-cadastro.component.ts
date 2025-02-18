import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormCadastraCarneComponent } from '../../shared/components/form-cadastra-carne/form-cadastra-carne.component';
import { FormCadastraBebidaComponent } from '../../shared/components/form-cadastra-bebida/form-cadastra-bebida.component';

@Component({
  selector: 'app-produtos-cadastro',
  standalone: true,
  imports: [ FormCadastraCarneComponent, FormCadastraBebidaComponent ],
  templateUrl: './produtos-cadastro.component.html',
  styleUrl: './produtos-cadastro.component.scss'
})
export class ProdutosCadastroComponent {
  parameterTipo!: string;
  parameterID!: string;

  @Input() set id(id: string) {
    this.parameterID = id;
  }

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.parameterTipo = this.router.snapshot.params['tipo'];
  }

}
