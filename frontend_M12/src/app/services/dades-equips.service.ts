import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IEquip } from '../interfaces/iequip';

@Injectable({
  providedIn: 'root'
})
export class DadesEquipsService {

  constructor(private _http: HttpClient) { }


  public getEquips(): Observable<HttpResponse<IEquip[]>> {
    return this._http.get<IEquip[]>('/api/equips', { observe: 'response' });
  }
  
  public updateEquip(id: any, dada: any): Observable<HttpResponse<any>> {
    return this._http.put<any>(`api/equip/${id}`, dada, { observe: 'response' });
  }

  public getEquip(id: any): Observable<HttpResponse<IEquip>> {
    return this._http.get<IEquip>(`/api/equip/get/${id}` , { observe: 'response' });
  }

  public deleteEquip(id: number): Observable<HttpResponse<any>> {
    return this._http.delete<any>(`api/equip/delete/${id}`, { observe: 'response' });
  }

  public createEquip(dada: any): Observable<HttpResponse<any>> {
    return this._http.post<any>('/api/equip/create', dada, { observe: 'response' });
  }

}
