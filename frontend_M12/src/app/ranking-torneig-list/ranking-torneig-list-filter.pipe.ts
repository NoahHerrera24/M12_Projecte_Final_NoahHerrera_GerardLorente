import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rankingTorneigListFilter',
  standalone: false
})
export class RankingTorneigListFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
