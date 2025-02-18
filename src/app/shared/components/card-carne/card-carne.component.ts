import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-carne',
  standalone: true,
  imports: [ CommonModule, MatCardModule ],
  templateUrl: './card-carne.component.html',
  styleUrl: './card-carne.component.scss'
})
export class CardCarneComponent {
  @Input() carne!: any
}