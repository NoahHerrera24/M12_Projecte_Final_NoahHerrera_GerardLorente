import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IEquip } from '../interfaces/iequip';

@Injectable({
  providedIn: 'root'
})
export class DadesEquipsService {

  private readonly baseUrl: string = 'https://m12projectefinalnoahherreragerardlorente-production.up.railway.app/api';

  constructor(private _http: HttpClient) { }

  public getEquips(): Observable<HttpResponse<IEquip[]>> {
    return this._http.get<IEquip[]>(`${this.baseUrl}/equips`, { observe: 'response' });
  }
  
  public updateEquip(id: any, dada: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.baseUrl}/equip/${id}`, dada, { observe: 'response' });
  }

  public getEquip(id: any): Observable<HttpResponse<IEquip>> {
    return this._http.get<IEquip>(`${this.baseUrl}/equip/get/${id}`, { observe: 'response' });
  }

  public deleteEquip(id: number): Observable<HttpResponse<any>> {
    return this._http.delete<any>(`${this.baseUrl}/equip/delete/${id}`, { observe: 'response' });
  }

  public createEquip(dada: any): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.baseUrl}/equip/create`, dada, { observe: 'response' });
  }

  joinEquip(equipId: number, userId: number): Observable<any> {
    return this._http.post(`${this.baseUrl}/equip/${equipId}/join`, { user_id: userId });
  }
  
  leaveEquip(equipId: number, userId: number): Observable<any> {
    return this._http.post(`${this.baseUrl}/equip/${equipId}/leave`, { user_id: userId });
  }  

}