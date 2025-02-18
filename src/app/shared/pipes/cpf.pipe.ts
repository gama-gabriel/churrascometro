import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
  standalone: true
})
export class CpfPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return ''; // Retorna vazio se o valor for nulo ou falso

    let cpf = value.toString().replace(/\D/g, ''); // remove caracteres não numéricos

    if (cpf.length !== 11) return 'Tá errado!'; // Retorna o valor se o tamanho do cpf for diferente de 11

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}
