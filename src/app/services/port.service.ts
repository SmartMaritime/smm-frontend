import { Injectable } from '@angular/core';
import { PortIn } from '../interfaces/port_in';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PortService {
  private url = 'assets/ports.json';
 

  constructor(private http: HttpClient) { }

  getPorts(): Observable<PortIn[]> {
    return this.http.get<PortIn[]>(this.url);
}
}