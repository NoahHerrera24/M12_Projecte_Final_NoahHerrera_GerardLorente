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

  private readonly baseUrl: string = 'http://127.0.0.1:8000/api';

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

}

