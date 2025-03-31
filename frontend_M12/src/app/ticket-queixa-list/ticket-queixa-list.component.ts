import { Component } from '@angular/core';
import { DadesTicketsQueixaService } from '../services/dades-tickets-queixa.service';
import { ITicketQueixa } from '../interfaces/iticket-queixa';

@Component({
  selector: 'app-ticket-queixa-list',
  templateUrl: './ticket-queixa-list.component.html',
  styleUrl: './ticket-queixa-list.component.css',
  standalone: false,

})
export class TicketQueixaListComponent {
  listFilter: string = '';
  ticketsQueixa: ITicketQueixa[] = [];

  constructor(private ticketsQueixaService: DadesTicketsQueixaService) {}

  ngOnInit(): void {
    this.loadTicketsQueixa();
  }

  loadTicketsQueixa(): void {
    this.ticketsQueixaService.getTicketsQueixa().subscribe({
      next: (resp) => {
        if (resp.body) {
          this.ticketsQueixa = resp.body.map(ticket => ({
            ...ticket,
            proves: Array.isArray(ticket.proves) ? ticket.proves : []
          }));
        }
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

  isImage(fileUrl: string): boolean {
    return fileUrl.match(/\.(jpeg|jpg|gif|png)$/i) !== null;
  }

  isVideo(fileUrl: string): boolean {
    return fileUrl.match(/\.(mp4|webm|ogg)$/i) !== null;
  }
}