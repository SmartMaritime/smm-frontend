import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://smartmaritime.onrender.com/api';
  //private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getPorts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ports/`);
  }

  estimateTrajet(departCode: string, arriveeCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/trajets/?depart=${departCode}&arrivee=${arriveeCode}`);
  }
}
