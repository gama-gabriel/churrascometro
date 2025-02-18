import { Component, Input } from '@angular/core';
import { FormCadastraChurrascoComponent } from '../../shared/components/form-cadastra-churrasco/form-cadastra-churrasco.component';

@Component({
  selector: 'app-churrascos-cadastro',
  standalone: true,
  imports: [ FormCadastraChurrascoComponent],
  templateUrl: './churrascos-cadastro.component.html',
  styleUrl: './churrascos-cadastro.component.scss'
})
export class ChurrascosCadastroComponent {
 parameterID!: string;

 @Input() set id(id: string) {
    console.log('ID', id);
    this.parameterID = id;
  }
}
