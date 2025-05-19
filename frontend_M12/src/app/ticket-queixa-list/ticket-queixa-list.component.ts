import { Component, OnInit } from '@angular/core';
import { DadesTicketsQueixaService } from '../services/dades-tickets-queixa.service';
import { ITicketQueixa } from '../interfaces/iticket-queixa';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ticket-queixa-list',
  standalone: false,
  templateUrl: './ticket-queixa-list.component.html',
  styleUrl: './ticket-queixa-list.component.css',
})
export class TicketQueixaListComponent implements OnInit {
  listFilter: string = '';
  ticketsQueixa: ITicketQueixa[] = [];
  user: any = null;
  tornejos: any[] = [];
  gestionarVisible: { [key: number]: boolean } = {};

  constructor(private ticketsQueixaService: DadesTicketsQueixaService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadTicketsQueixa();
    this.loadTorneigs();
  }

  loadTicketsQueixa(): void {
    if (!this.user) {
      console.error('Usuari no loguejat');
      return;
    }

    this.ticketsQueixaService.getTicketsQueixa(this.user.id).subscribe({
      next: (resp) => {
        console.log('Tickets Queixa rebuts:', resp.body);
        this.ticketsQueixa = resp.body || [];
      },
      error: (err) => {
        console.error('Error en obtenir les dades dels tickets de queixa:', err);
      }
    });
  }

  loadTorneigs(): void {
    this.ticketsQueixaService.getTornejosByUser(this.user.id).subscribe({
      next: (resp) => this.tornejos = resp.body || [],
      error: (err) => console.error(err)
    });
  }

  getNomTorneig(id: number): string {
    const torneig = this.tornejos.find(t => t.id === id);
    return torneig ? torneig.nom : 'Desconegut';
  }

  toggleGestionar(ticketId: number) {
    this.gestionarVisible[ticketId] = !this.gestionarVisible[ticketId];
  }

  expulsarJugador(ticket: ITicketQueixa, torneigId: number, userId: number) {
    this.ticketsQueixaService.expulsarJugador(torneigId, userId).subscribe({
      next: () => {
        this.ticketsQueixaService.actualitzarEstatTicketQueixa(ticket.id).subscribe({
          next: () => {
            this.loadTicketsQueixa();
            this.gestionarVisible[ticket.id] = false;
            alert('Jugador Expulsat del Torneig i Ticket Resolt.');
          },
          error: (err) => {
            console.error(err);
            alert('Error a l\'actualitzar l\'estat del ticket.');
          }
        });
      },
      error: (err) => {
        console.error(err);
        alert('Error a l\'Expulsar al Jugador');
      }
    });
  }  

  descartarQueixa(ticket: ITicketQueixa) {
    this.ticketsQueixaService.actualitzarEstatTicketQueixa(ticket.id).subscribe({
      next: () => {
        this.loadTicketsQueixa();
        this.gestionarVisible[ticket.id] = false;
        alert('Queixa Descartada.');
      },
      error: (err) => {
        console.error(err);
        alert('Error a l\'actualitzar l\'estat del ticket.');
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