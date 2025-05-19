import { Component } from '@angular/core';
import { ITorneig } from '../interfaces/itorneig';
import { DadesTornejosService } from '../services/dades-tornejos.service';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/iuser';

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
  isLoggedIn: boolean = false;
  user: IUser | null = null;

  constructor(private authService: AuthService, private torneigService: DadesTornejosService) {} 

  ngOnInit(): void {
    this.loadTornejos();

    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
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

  joinTorneig(torneigId: number): void {
    if (!this.isLoggedIn || !this.user) {
      console.error('Cal estar loguejat per unir-se a un torneig.');
      return;
    }
  
    const userId = this.user.id;
  
    this.torneigService.joinTorneig(torneigId, userId).subscribe({
      next: (response) => {
        console.log('Inscrit al torneig amb èxit:', response.message);
        alert('Inscrit al torneig amb èxit!');
  
        if (this.user) {
          if (!this.user.tornejos) {
            this.user.tornejos = [];
          }
          this.user.tornejos.push({ id: torneigId } as ITorneig);
        }
      },
      error: (err) => {
        console.error('Error a la inscripció:', err.error?.error || err.message);
        alert(err.error?.error || 'Error a la inscripció.');
      }
    });
  }
  
  leaveTorneig(torneigId: number): void {
    if (!this.user) return;
  
    this.torneigService.leaveTorneig(torneigId, this.user.id).subscribe({
      next: (resp) => {
        console.log(resp.message);
        alert(resp.message);
  
        if (this.user && this.user.tornejos) {
          this.user.tornejos = this.user.tornejos.filter(t => t.id !== torneigId);
        }
  
        this.loadTornejos();
      },
      error: (err) => {
        console.error(err.error?.error || err.message);
        alert(err.error?.error || 'Error al sortir del torneig.');
      }
    });
  }
   
  isJoined(torneigId: number): boolean {
    return !!(this.user?.tornejos && this.user.tornejos.some(t => t.id === torneigId));
  }
  
  isExpulsat(torneigId: number): boolean {
    const torneig = this.user?.tornejos?.find(t => t.id === torneigId);
    return !!(torneig && (torneig as any).pivot && (torneig as any).pivot.expulsat);
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