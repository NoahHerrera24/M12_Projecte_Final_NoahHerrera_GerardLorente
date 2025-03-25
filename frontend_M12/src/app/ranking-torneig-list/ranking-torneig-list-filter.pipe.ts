import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rankingTorneigListFilter'
})
export class RankingTorneigListFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
