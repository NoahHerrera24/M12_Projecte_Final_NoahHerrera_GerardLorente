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

  constructor(private _http: HttpClient) { }

  public getTornejos(): Observable<HttpResponse<ITorneig[]>> {
    return this._http.get<ITorneig[]>('/api/tornejos', { observe: 'response' });
  }

  public updateTorneig(id: any, dada: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`api/torneig/${id}`, dada, { observe: 'response' });
  }

  public getTorneig(id: any): Observable<HttpResponse<ITorneig>> {
    return this._http.get<ITorneig>(`/api/torneig/get/${id}`, { observe: 'response' });
  }

  public deleteTorneig(id: number): Observable<HttpResponse<any>> {
    return this._http.delete<any>(`api/torneig/delete/${id}`, { observe: 'response' });
  }

  public createTorneig(dada: any): Observable<HttpResponse<any>> {
    return this._http.post<any>('/api/torneig/create', dada, { observe: 'response' });
  }

  // filepath: /var/www/html/m12/M12_Projecte_Final_NoahHerrera_GerardLorente/frontend_M12/src/app/services/dades-tornejos.service.ts
  public getJugadors(): Observable<HttpResponse<IUser[]>> {
    return this._http.get<IUser[]>('/api/jugadors', { observe: 'response' });
  }

}

