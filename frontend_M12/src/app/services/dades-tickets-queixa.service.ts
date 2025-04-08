import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ITicketQueixa } from '../interfaces/iticket-queixa';

@Injectable({
  providedIn: 'root'
})
export class DadesTicketsQueixaService {

  private readonly baseUrl: string = 'http://127.0.0.1:8000/api';

  constructor(private _http: HttpClient) { }

  public getTicketsQueixa(): Observable<HttpResponse<ITicketQueixa[]>> {
    return this._http.get<ITicketQueixa[]>(`${this.baseUrl}/tickets-queixa`, { observe: 'response' });
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

}


