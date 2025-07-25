import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutesComponent } from './routes/routes.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service'; 
import { MapComponent } from './map/map.component';

import { HttpClientModule } from '@angular/common/http';
import { LogComponent } from './layout/log/log.component';
@NgModule({
  declarations: [
    MapComponent,
    AppComponent,
    RoutesComponent,
    FooterComponent,
    HeaderComponent,
    LogComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    LeafletModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
