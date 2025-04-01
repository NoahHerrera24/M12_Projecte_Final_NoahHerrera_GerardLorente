import { Component } from '@angular/core';
import { DadesRankingsService } from '../services/dades-rankings.service';

@Component({
  selector: 'app-ranking-equips-list',
  standalone: false,
  templateUrl: './ranking-equips-list.component.html',
  styleUrl: './ranking-equips-list.component.css'
})
export class RankingEquipsListComponent {

  rankingEquips: any[] = [];
  errorMessage: string = '';
  
  constructor(private rankingsService: DadesRankingsService) {}
  
  ngOnInit(): void {
    this.rankingsService.getRankingEquips().subscribe({
      next: (data) => this.rankingEquips = data.body,
      error: (err) => {
        console.error('Error fetching ranking equips:', err);
        this.errorMessage = 'Failed to load ranking equips. Please try again later.';
      }
    });
  }

}