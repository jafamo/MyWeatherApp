import { Injectable } from '@angular/core';

//importamos el modelo de weather-location
import { WeatherLocation } from '../models/weather-location';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public locations: WeatherLocation[] = [];

  public id=0;
  constructor() {

    if(localStorage.getItem('id')){
      this.id = Number(localStorage.getItem('id'));
      console.log('Aqui el ID del localstorage: '+this.id);
    }

    if(localStorage.getItem('locations')){
      this.locations = JSON.parse(localStorage.getItem('locations'));
      console.log('Mostramos el constructor:'+this.locations['name']);
    }
    /*
    this.locations.push({
      id: 100,
      lat: 38.71,
      lon: -0.47,
      name: 'Alcoy',
      country: 'ES'
      });
*/
  }

  addLocation(location: WeatherLocation): void{
    console.log(`[StoreService] addLocation(${location.name})`);
    this.id = this.id+1;
    console.log('Aqui el locatin'+location.id);
    let variable: WeatherLocation = location;


    this.locations.push(location);
    //console.log("Aqui el length:"+this.locations.length);

    console.log("Despues del for"+this.locations);
    localStorage.setItem('id', String(this.id));
    localStorage.setItem('locations', JSON.stringify(this.locations));


  }

  removeLocation(id: number): void{
    console.log(`[StoreService] findLocation(${id})`);

    let index = this.locations.findIndex((location => location['id'] === id ));
    if(index !== -1) {
      this.locations.splice(index, 1);
      localStorage.setItem('locations', JSON.stringify(this.locations));
      console.log("Eliminado");
      //checkeamos si es el ultimo
      if( localStorage.getItem('locations').length === 0 ) {
        console.log("Borramos el LOCALSTORAGE");
        localStorage.removeItem('locations');
        localStorage.removeItem('id');

        localStorage.clear();
      }
      //comprobar si el array de locations esta vacio


    }else{
      console.log('No se puede eliminar');
    }

  }

  listLocations(): WeatherLocation[]{
    console.log(`[StoreService listLocation()]`);
    return this.locations =  JSON.parse(localStorage.getItem('locations'));;

  }

  findLocation(id: number):WeatherLocation {
    console.log(`[StoreService] findLocation(${id})`);
    let index = this.locations.findIndex((location => location.id === id ));
    if(index !== -1) return this.locations[index];
    else return null;
}

}
