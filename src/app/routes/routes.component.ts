import { Component,OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { ApiService } from '../services/api.service'; 
import { GeocodeService } from '../services/geocode.service';


import { PortIn } from '../interfaces/port_in';
@Component({  
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent {

   constructor(private apiService: ApiService, private geocodeService: GeocodeService,
      
    ) { delete (L.Icon.Default.prototype as any)._getIconUrl;
       L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    });} 
  
    departureIcon = L.icon({
    iconUrl: 'assets/marker-icon.png',  
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'assets/marker-shadow.png',
    shadowSize: [41, 41]
  });
  
  // Icône d’arrivée (rouge)
  arrivalIcon = L.icon({
    iconUrl: 'assets/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'assets/marker-shadow.png',
    shadowSize: [41, 41]
  });
  
    estimation: any = null;
    error = '';
  
    vale: string ="";
    vale2: string ="";
    results: any;
    data: PortIn[] = [];
  
  portDepart!: PortIn 
  portArrivee!: PortIn 
  
         options = {
          layers: [
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18,
              attribution: '© OpenStreetMap contributors'
            })
          ],
          zoom: 5,
          center: L.latLng(48.8566, 2.3522)
        };
  
    layers: L.Layer[] = [];
  
  
  
   
    
    ngOnInit() {
       delete (L.Icon.Default.prototype as any)._getIconUrl;
      
         L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      });
     
      this.apiService.getPorts().subscribe(data => this.data = data);
  
  
    }
  
  
  
  
  find(event :Event) {
    event.preventDefault();
  // évite le rechargement de page
  
    // Traite l// Affiche le marqueur
        this.layers = [];
    this.geocodeService.getCoordinates(this.vale).subscribe(results => {
      if (results.length > 0) {
        const lat = parseFloat(results[0].lat);
        const lon = parseFloat(results[0].lon);
        this.portDepart = this.getNearestPort(lat, lon);
        console.log('Port de départ :', this.portDepart);
  
        // Affiche le marqueur
        this.layers.push(
          L.marker([this.portDepart.latitude, this.portDepart.longitude],{ icon: this.departureIcon }).bindPopup('Départ : ' + this.portDepart.name)
        );
      }
    });
  
    // Traite le point d’arrivée
    this.geocodeService.getCoordinates(this.vale2).subscribe(results => {
      if (results.length > 0) {
        const lat = parseFloat(results[0].lat);
        const lon = parseFloat(results[0].lon);
        this.portArrivee = this.getNearestPort(lat, lon);
        console.log('Port d’arrivée :', this.portArrivee);
  
        // Affiche le marqueur
        this.layers.push(
          L.marker([this.portArrivee.latitude, this.portArrivee.longitude],{ icon: this.arrivalIcon }).bindPopup('Arrivée : ' + this.portArrivee.name)
          
          
        
        );
      }
    });
  }
  
  getNearestPort(lat: number, lon: number): PortIn {
    return this.data.reduce((acc, curr) => {
      const distAcc = this.getDistance(lat, lon, acc.latitude, acc.longitude);
      const distCurr = this.getDistance(lat, lon, curr.latitude, curr.longitude);
      return distCurr < distAcc ? curr : acc;
    });
  }
    estimerTrajet() {
    this.error = '';
    this.estimation = null;
    if (!this.portDepart || !this.portArrivee) {
      this.error = 'Veuillez sélectionner les deux ports via le formulaire.';
      return;
    }
  
    const codeDepart = this.portDepart.code;
    const codeArrivee = this.portArrivee.code;
  
    this.apiService.estimateTrajet(codeDepart, codeArrivee).subscribe({
      next: (data) => {
      this.estimation = data;
      console.log('Données reçues :', data);       // tu stockes la réponse dans this.estimation
      const polyline = L.polyline(data.path, { color: 'blue' });
      this.layers.push(polyline);
    },
      error: err => this.error = "Erreur lors de l'estimation"
      
    });
  //   const polyline = L.polyline([
  //   [this.portDepart.latitude, this.portDepart.longitude],
  //   [this.portArrivee.latitude, this.portArrivee.longitude]
  // ], { color: 'blue' });
  // this.layers.push(polyline);
  
  
  }  
  
      getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
      const toRad = (value: number) => value * Math.PI / 180;
      const R = 6371; // rayon de la Terre en km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
  





 
}

