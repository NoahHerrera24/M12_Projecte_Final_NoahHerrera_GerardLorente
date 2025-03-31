import { Pipe, PipeTransform } from '@angular/core';
import { ITicketQueixa } from '../interfaces/iticket-queixa';

@Pipe({
  name: 'ticketQueixaListFilter',
  standalone: false
})
export class TicketQueixaListFilterPipe implements PipeTransform {

  transform(ticketsQueixa: ITicketQueixa[], filterBy: string): ITicketQueixa[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy
      ? ticketsQueixa.filter((ticketQueixa) =>
          ticketQueixa.descripcio.toLowerCase().indexOf(filterBy) !== -1 || ticketQueixa.estat.toLowerCase().indexOf(filterBy) !== -1
        )
      : ticketsQueixa;
  }

}
