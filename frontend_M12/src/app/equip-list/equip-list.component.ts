import { Component, OnInit } from '@angular/core';
import { IEquip } from '../interfaces/iequip';
import { DadesEquipsService } from '../services/dades-equips.service';

@Component({
  selector: 'app-equip-list',
  standalone: false,
  templateUrl: './equip-list.component.html',
  styleUrl: './equip-list.component.css'
})
export class EquipListComponent implements OnInit {
  titolLlistat: string = 'Llistat d’equips';
  listFilter: string = '';
  equips: IEquip[] = [];

  constructor(private equipsService: DadesEquipsService) {}

  ngOnInit(): void {
    this.loadEquips();
  }

  loadEquips(): void {
    this.equipsService.getEquips().subscribe({
      next: (resp) => {
        if (resp.body) {
          this.equips = resp.body;
        }
      },
      error: (err) => {
        console.error('Error al obtenir equips', err);
      }
    });
  }

  deleteEquip(id: number): void {
    this.equipsService.deleteEquip(id).subscribe({
      next: () => {
        this.loadEquips();
      },
      error: (err) => {
        console.error('Error al eliminar l\'equip', err);      }
    });
  }
}