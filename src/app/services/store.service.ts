import { Injectable } from '@angular/core';

//importamos el modelo de weather-location
import { WeatherLocation } from '../models/weather-location';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private locations: WeatherLocation[] = [];

  constructor() {
    this.locations.push({
      id: 100,
      lat: 38.71,
      lon: -0.47,
      name: 'Alcoy',
      country: 'ES'

      });
  }

  addLocation(location: WeatherLocation): void{
    console.log(`[StoreService] addLocation(${location.name})`);
    this.locations.push(location);

  }

  removeLocation(id: number): void{
    console.log(`[StoreService] findLocation(${id})`);
    let index = this.locations.findIndex((location => location.id === id ));
    if(index !== -1) this.locations.splice(index, 1);

  }

  listLocation(): WeatherLocation[]{
    console.log(`[StoreService listLocation()]`);
    return this.locations;

  }

  findLocation(id: number):WeatherLocation {
    console.log(`[StoreService] findLocation(${id})`);
    let index = this.locations.findIndex((location => location.id === id ));
    if(index !== -1) return this.locations[index];
    else return null;
}

}
