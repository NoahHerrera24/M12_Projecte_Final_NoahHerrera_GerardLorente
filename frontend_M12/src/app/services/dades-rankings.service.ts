import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadesRankingsService {

  private readonly baseUrl: string = 'https://m12projectefinalnoahherreragerardlorente-production.up.railway.app/api';

  constructor(private _http: HttpClient) { }

  public getRankingEquips(): Observable<HttpResponse<any>> {
    return this._http.get<any>(`${this.baseUrl}/ranking-equips`, { observe: 'response' });
  }

  public getRankingParticipants(): Observable<HttpResponse<any>> {
    return this._http.get<any>(`${this.baseUrl}/ranking-participants`, { observe: 'response' });
  }

  public getRankingTornejos(): Observable<HttpResponse<any>> {
    return this._http.get<any>(`${this.baseUrl}/ranking-tornejos`, { observe: 'response' });
  }

}
