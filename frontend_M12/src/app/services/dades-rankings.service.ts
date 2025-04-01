import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadesRankingsService {

  constructor(private _http: HttpClient) { }

  public getRankingEquips(): Observable<HttpResponse<any>> {
    return this._http.get<any>('/api/ranking-equips', { observe: 'response' });
  }

  public getRankingParticipants(): Observable<HttpResponse<any>> {
    return this._http.get<any>('/api/ranking-participants', { observe: 'response' });
  }

  public getRankingTornejos(): Observable<HttpResponse<any>> {
    return this._http.get<any>('/api/ranking-tornejos', { observe: 'response' });
  }

}
