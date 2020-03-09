import { Injectable } from '@angular/core';

//importamos el modelo:
import { WeatherLocation } from '../models/weather-location';

@Injectable({
  providedIn: 'root'
})
export class WeatherLocationService {

  /**Recuperar las ubicaciones disponibles
   *
   * @param desc
   * @param cb
   */
  findLocation(desc: string,
               cb:(err:Error, locations:WeatherLocation[]) => void): void{
                  console.log(`[WeatherLocationServices] findLocations(${desc}) `);
                  let location = {
                    id: 100,
                    lat: 38.71,
                    lon: -0.47,
                    name: 'Alcoy',
                    country: 'ES'
                  };
              cb(null, [location]);
              console.log('entra aqui');
  }

  constructor() { }
}
