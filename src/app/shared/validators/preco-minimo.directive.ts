import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPrecoMinimo]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS, // identifica como validador
      useExisting: forwardRef(() => PrecoMinimoDirective), // fornece a diretiva
      multi: true // permite mais de um validador
    }
  ]
})
export class PrecoMinimoDirective {
  @Input() precoMinimo: number = 0;

  validate(control: AbstractControl): ValidationErrors | null {
    const valor = control.value; // pega o valor do campo do formulário
    return valor && valor < this.precoMinimo
      ? { precoMinimo: { valorAtual: valor, valorMinimo: this.precoMinimo } } // retorna um ValidationError
      : null;
  }
}
