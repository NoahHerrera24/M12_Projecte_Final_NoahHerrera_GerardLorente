import { Component } from '@angular/core';
import { ITorneig } from '../interfaces/itorneig';
import { DadesTornejosService } from '../services/dades-tornejos.service';

@Component({
  selector: 'app-torneig-list',
  standalone: false,
  templateUrl: './torneig-list.component.html',
  styleUrl: './torneig-list.component.css'
})
export class TorneigListComponent {
  titolLlistat: string = 'Llistat de Tornejos';
  torneigs: ITorneig[] = [];
  listFilter: string = '';

  constructor(private torneigService: DadesTornejosService) {} 

  ngOnInit(): void {
    this.loadTornejos();
  }

  loadTornejos(): void {
    this.torneigService.getTornejos().subscribe({
      next: (resp) => {
        if (resp.body) {
          this.torneigs = resp.body;
        }
      },
      error: (err) => {
        console.error('Error al obtenir tornejos', err);
      }
    });
  }

  deleteTorneig(id: number): void {
    this.torneigService.deleteTorneig(id).subscribe({
      next: () => {
        this.loadTornejos();
      },
      error: (err) => {
        console.error('Error al eliminar el torneig', err);
      }
    });
  }
}