import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundValue'
})
export class RoundValuePipe implements PipeTransform {

  transform(value: number, digits: number = 0, mode: 'round' | 'floor' | 'ceil' = 'round'): number {
    if (isNaN(value)) return value;
    const factor = Math.pow(10, digits);

    switch (mode) {
      case 'floor':
        return Math.floor(value * factor) / factor;
      case 'ceil':
        return Math.ceil(value * factor) / factor;
      default:
        return Math.round(value * factor) / factor;
    }
  }

}
