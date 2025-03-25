import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'torneigListFilter'
})
export class TorneigListFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
