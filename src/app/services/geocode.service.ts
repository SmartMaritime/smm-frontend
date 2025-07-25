import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private baseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  getCoordinates(query: string): Observable<any[]> {
    const url = `${this.baseUrl}?format=json&q=${encodeURIComponent(query)}`;
    return this.http.get<any[]>(url);
  }
}
