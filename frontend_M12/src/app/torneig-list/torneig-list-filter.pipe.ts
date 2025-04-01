import { Pipe, PipeTransform } from '@angular/core';
import { ITorneig } from '../interfaces/itorneig';

@Pipe({
  name: 'torneigListFilter',
  standalone: false
})
export class TorneigListFilterPipe implements PipeTransform {

  transform(torneigs: ITorneig[], filterBy: string): ITorneig[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy ? torneigs.filter((torneig) => {
      return torneig.nom.toLowerCase().indexOf(filterBy) !== -1;
    }) : torneigs;
  }

}