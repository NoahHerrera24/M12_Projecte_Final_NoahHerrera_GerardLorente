import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ITorneig } from '../interfaces/itorneig';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class DadesTornejosService {

  private readonly baseUrl: string = 'https://m12projectefinalnoahherreragerardlorente-production.up.railway.app/api';

  constructor(private _http: HttpClient) { }

  public getTornejos(): Observable<HttpResponse<ITorneig[]>> {
    return this._http.get<ITorneig[]>(`${this.baseUrl}/tornejos`, { observe: 'response' });
  }

  public updateTorneig(id: any, dada: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.baseUrl}/torneig/${id}`, dada, { observe: 'response' });
  }

  public getTorneig(id: any): Observable<HttpResponse<ITorneig>> {
    return this._http.get<ITorneig>(`${this.baseUrl}/torneig/get/${id}`, { observe: 'response' });
  }

  public deleteTorneig(id: number): Observable<HttpResponse<any>> {
    return this._http.delete<any>(`${this.baseUrl}/torneig/delete/${id}`, { observe: 'response' });
  }

  public createTorneig(dada: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.baseUrl}/torneig/create`, dada, { observe: 'response' });
  }

  public getJugadors(): Observable<HttpResponse<IUser[]>> {
    return this._http.get<IUser[]>(`${this.baseUrl}/jugadors`, { observe: 'response' });
  }

  public joinTorneig(torneigId: number, userId: number): Observable<any> {
    return this._http.post(`${this.baseUrl}/torneig/${torneigId}/join`, { user_id: userId });
  }

  public leaveTorneig(torneigId: number, userId: number): Observable<any> {
    return this._http.post(`${this.baseUrl}/torneig/${torneigId}/leave`, { user_id: userId });
  }
  
  public getParticipants(torneigId: number, userId: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/torneig/${torneigId}/participants`, {
      params: { user_id: userId }
    });
  }
  
  public declareWinner(torneigId: number, winnerId: number, userId: number): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/torneig/${torneigId}/declare-winner`, { winner_id: winnerId, user_id: userId });
  }
  
}