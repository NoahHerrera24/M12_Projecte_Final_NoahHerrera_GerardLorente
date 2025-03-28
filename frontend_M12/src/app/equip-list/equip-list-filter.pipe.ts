import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equipListFilter'
})
export class EquipListFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
