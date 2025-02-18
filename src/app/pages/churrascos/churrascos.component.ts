import { Component } from '@angular/core';
import { ListaChurrascoComponent } from '../../shared/components/lista-churrasco/lista-churrasco.component';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-churrascos',
  standalone: true,
  imports: [ ListaChurrascoComponent, MatButtonModule, RouterLink],
  templateUrl: './churrascos.component.html',
  styleUrl: './churrascos.component.scss'
})
export class ChurrascosComponent {

}
