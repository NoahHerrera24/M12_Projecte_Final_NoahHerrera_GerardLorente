import { Pipe, PipeTransform } from '@angular/core';
import { IEquip } from '../interfaces/iequip';

@Pipe({
  name: 'equipListFilter',
  standalone: false
})
export class EquipListFilterPipe implements PipeTransform {

  transform(equips: IEquip[], filterBy: string): IEquip[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy ? equips.filter((equip) => {
      return equip.nom.toLowerCase().indexOf(filterBy) !== -1 || 
             equip.colors_representatius.toLowerCase().indexOf(filterBy) !== -1;
    }) : equips;
  }

}
