import { Component } from '@angular/core';
import { DadesRankingsService } from '../services/dades-rankings.service';

@Component({
  selector: 'app-ranking-torneig-list',
  standalone: false,
  templateUrl: './ranking-torneig-list.component.html',
  styleUrl: './ranking-torneig-list.component.css'
})
export class RankingTorneigListComponent {

  rankingTornejos: any[] = [];
  errorMessage: string = '';

  constructor(private rankingsService: DadesRankingsService) {}

  ngOnInit(): void {
    this.rankingsService.getRankingTornejos().subscribe({
      next: (data) => this.rankingTornejos = data.body, 
      error: (err) => this.errorMessage = err.message
    });
  }

}