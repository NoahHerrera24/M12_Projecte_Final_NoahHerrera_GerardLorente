import { Component, OnInit } from '@angular/core';
import { DadesTicketsQueixaService } from '../services/dades-tickets-queixa.service';
import { ITicketQueixa } from '../interfaces/iticket-queixa';

@Component({
  selector: 'app-ticket-queixa-list',
  standalone: false,
  templateUrl: './ticket-queixa-list.component.html',
  styleUrl: './ticket-queixa-list.component.css',

})
export class TicketQueixaListComponent implements OnInit {
  listFilter: string = '';
  ticketsQueixa: ITicketQueixa[] = [];

  constructor(private ticketsQueixaService: DadesTicketsQueixaService) {}

  ngOnInit(): void {
    this.loadTicketsQueixa();
  }

  loadTicketsQueixa(): void {
    this.ticketsQueixaService.getTicketsQueixa().subscribe({
      next: (resp) => {
        this.ticketsQueixa = resp.body || [];
      },
      error: (err) => {
        console.error('Error en obtenir les dades dels tickets de queixa:', err);
      }
    });
  }

  deleteTicketQueixa(id: number): void {
    this.ticketsQueixaService.deleteTicketQueixa(id).subscribe({
      next: () => {
        this.loadTicketsQueixa();
      },
      error: (err) => {
        console.error("Error en eliminar el ticket de queixa:", err);
      }
    });
  }

}