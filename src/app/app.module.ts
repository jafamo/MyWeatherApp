import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchLocationComponent } from './components/search-location/search-location.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import {RouterModule} from "@angular/router";

//librerias graficas
import { MatToolbarModule } from '@angular/material/toolbar';

import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {WeatherCardComponent} from "./components/weather-card/weather-card.component";
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {WeatherLocationService} from "./services/weather-location.service";
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SearchLocationComponent,
    WeatherDetailsComponent,
    ForecastComponent,
    WeatherCardComponent,
    ForecastCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'search', component: SearchLocationComponent},
        {path: 'details/:id', component: WeatherDetailsComponent},
        {path: 'forecast/:id', component: ForecastComponent},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
      ]
    ),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule, //para el search
    MatInputModule,
    FormsModule,
    MatListModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
