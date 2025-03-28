import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketQueixaListFilter'
})
export class TicketQueixaListFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
