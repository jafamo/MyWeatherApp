import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {StoreService} from "../../services/store.service";
import {WeatherLocation} from "../../models/weather-location"; //obtener los datos del servicio


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router, public storeService: StoreService) { }

  ngOnInit(): void {
  }

  public location: WeatherLocation;

  addLocation(){
    console.log('Ir a addLocation');
    this.router.navigateByUrl('/search');
  }

  removeLocation(location: WeatherLocation) {
    console.log(`[DashboardComponent] removeLocation(${location.name})`);
    this.storeService.removeLocation(location.id);
  }


}
