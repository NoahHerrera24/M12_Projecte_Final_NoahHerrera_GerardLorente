import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rankingEquipsListFilter',
  standalone: false
})
export class RankingEquipsListFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
