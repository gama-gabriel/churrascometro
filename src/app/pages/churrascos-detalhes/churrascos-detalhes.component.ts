import { Component, Input } from '@angular/core';
import { TabelaChurrascoComponent } from '../../shared/components/tabela-churrasco/tabela-churrasco.component';

@Component({
  selector: 'app-churrascos-detalhes',
  standalone: true,
  imports: [TabelaChurrascoComponent],
  templateUrl: './churrascos-detalhes.component.html',
  styleUrl: './churrascos-detalhes.component.scss'
})
export class ChurrascosDetalhesComponent {
  parameterID!: string;

  @Input() set id(id: string) {
    this.parameterID = id;
  }
}
