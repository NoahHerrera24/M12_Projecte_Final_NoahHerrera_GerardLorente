import { Component } from '@angular/core';
import { DadesRankingsService } from '../services/dades-rankings.service';

@Component({
  selector: 'app-ranking-participant-list',
  standalone: false,
  templateUrl: './ranking-participant-list.component.html',
  styleUrl: './ranking-participant-list.component.css'
})
export class RankingParticipantListComponent {

  rankingParticipants: any[] = [];
  errorMessage: string = '';

  constructor(private rankingsService: DadesRankingsService) {}

  ngOnInit(): void {
    this.rankingsService.getRankingParticipants().subscribe({
      next: (data) => this.rankingParticipants = data.body, 
      error: (err) => this.errorMessage = err.message
    });
  }

}