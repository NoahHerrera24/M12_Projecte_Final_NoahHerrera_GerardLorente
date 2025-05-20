import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ITicketQueixa } from '../interfaces/iticket-queixa';

@Injectable({
  providedIn: 'root'
})
export class DadesTicketsQueixaService {

  private readonly baseUrl: string = 'https://m12projectefinalnoahherreragerardlorente-production.up.railway.app/api';

  constructor(private _http: HttpClient) { }

  getTicketsQueixa(userId: number): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.baseUrl}/tickets-queixa`, { user_id: userId }, { observe: 'response' });
  }   
  
  public updateTicketQueixa(id: any, dada: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.baseUrl}/ticket-queixa/${id}`, dada, { observe: 'response' });
  }

  public getTicketQueixa(id: any): Observable<HttpResponse<ITicketQueixa>> {
    return this._http.get<ITicketQueixa>(`${this.baseUrl}/ticket-queixa/get/${id}`, { observe: 'response' });
  }

  public deleteTicketQueixa(id: number): Observable<HttpResponse<any>> {
    return this._http.delete<any>(`${this.baseUrl}/ticket-queixa/delete/${id}`, { observe: 'response' });
  }

  public createTicketQueixa(dada: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.baseUrl}/ticket-queixa/create`, dada, { observe: 'response' });
  }

  public getTornejosByUser(userId: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/ticket-queixa/tornejos-user/${userId}`, { observe: 'response' });
  }

  public getParticipantsByTorneig(torneigId: number, userId: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/ticket-queixa/participants-torneig/${torneigId}/${userId}`, { observe: 'response' });
  }

  public getUsuariCulpable(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/ticket-queixa/user-culpable/${id}`);
  }
  
  public expulsarJugador(torneigId: number, userId: number) {
    return this._http.put(`${this.baseUrl}/ticket-queixa/${torneigId}/expulsar/${userId}`, {});
  }
  
  public actualitzarEstatTicketQueixa(ticketId: number) {
    return this._http.put(`${this.baseUrl}/ticket-queixa/${ticketId}/resoldre`, null, { observe: 'response' });
  }  

}