import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ITicketQueixa} from '../interfaces/iticket-queixa';

@Injectable({
  providedIn: 'root'
})
export class DadesTicketsQueixaService {

  constructor(private _http: HttpClient) { }


  public getTicketsQueixa(): Observable<HttpResponse<ITicketQueixa[]>> {
    return this._http.get<ITicketQueixa[]>('/api/tickets-queixa', { observe: 'response' });
  }
  
  public updateTicketQueixa(id: any, dada: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`api/ticket-queixa/${id}`, dada, { observe: 'response' });
  }

  public getTicketQueixa(id: any): Observable<HttpResponse<ITicketQueixa>> {
    return this._http.get<ITicketQueixa>(`/api/ticket-queixa/get/${id}` , { observe: 'response' });
  }

  public deleteTicketQueixa(id: number): Observable<HttpResponse<any>> {
    return this._http.delete<any>(`api/ticket-queixa/delete/${id}`, { observe: 'response' });
  }

  public createTicketQueixa(dada: any): Observable<HttpResponse<any>> {
    return this._http.post<any>('/api/ticket-queixa/create', dada, { observe: 'response' });
  }

}


