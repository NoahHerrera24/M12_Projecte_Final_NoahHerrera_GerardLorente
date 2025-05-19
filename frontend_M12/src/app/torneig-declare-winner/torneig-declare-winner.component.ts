import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesTornejosService } from '../services/dades-tornejos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-torneig-declare-winner',
  standalone: false,
  
  templateUrl: './torneig-declare-winner.component.html',
  styleUrl: './torneig-declare-winner.component.css'
})
export class TorneigDeclareWinnerComponent implements OnInit {
  torneigId: number = 0;
  participants: any[] = [];
  user: any = null;

  constructor(
    private torneigService: DadesTornejosService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.torneigId = +this.route.snapshot.paramMap.get('id')!;
    this.loadParticipants();
  }

  loadParticipants(): void {
    this.torneigService.getParticipants(this.torneigId, this.user.id).subscribe((data: any) => {
      this.participants = data.filter((p: any) => !p.pivot?.expulsat);
    });
  }

  onDeclareWinner(): void {
    const winner = this.participants.find(p => p.selected);
    if (winner) {
      this.torneigService.declareWinner(this.torneigId, winner.id, this.user.id).subscribe(() => {
        alert('Guanyador declarat');
        this.router.navigate(['/torneig-list']);
      });
    } else {
      alert('Si us plau selecciona un guanyador');
    }
  }

}