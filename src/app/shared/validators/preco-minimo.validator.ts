import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function precoMinimoValidator(precoMinimo: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && control.value < precoMinimo
      ? { precoMinimo: { valorAtual: control.value, valorMinimo: precoMinimo } } // retorna um ValidationError
      : null; // retorna null
  };
}