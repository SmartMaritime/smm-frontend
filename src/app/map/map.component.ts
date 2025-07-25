import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 3,
    center: L.latLng(20, 0)
  };

  layers: L.Layer[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    
       L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    });
    this.api.getPorts().subscribe(ports => {
      this.layers = ports.map(port =>
        L.marker([port.latitude, port.longitude]).bindPopup(port.name)
      );
    });
  }
}
