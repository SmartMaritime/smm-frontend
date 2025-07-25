// src/app/services/routes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
   private geoJsonUrl = 'assets/data/Shipping_Lanes_v2.geojson';

  constructor(private http: HttpClient) {}

  getShippingRoutes(): Observable<any> {
    return this.http.get<any>(this.geoJsonUrl);
  }

 
}
