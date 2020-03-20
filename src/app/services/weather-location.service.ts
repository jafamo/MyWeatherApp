import { Injectable } from '@angular/core';

//importamos el modelo:
import { WeatherLocation } from '../models/weather-location';
import {HttpClient} from "@angular/common/http";




@Injectable({
  providedIn: 'root'
})
export class WeatherLocationService {

  constructor(public http: HttpClient) { }

  /**Recuperar las ubicaciones disponibles
   *
   * @param desc
   * @param cb
   */
  /*
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

*/

  public key = 'c60fcc50dea05a84f20dacca2a03dea7';
  public url = `https://api.openweathermap.org/data/2.5/weather`;//{city name}&appid={your api key}

  findLocation(desc: string, cb: (err: Error, locations: WeatherLocation[]) => void): void {
    console.log(`[WeatherLocationService] findLocation(${desc}`);
    this.http.get<any>(this.url, {
      params: { APPID: this.key, q: desc }
    })
      .subscribe(
        (info) => {
          console.log('[WeatherLocationService] findLocation() success.');
          if (info) {
            cb(null, [{
              id: info.id,
              lat: info.coord.lat,
              lon: info.coord.lon,
              name: info.name,
              country: info.sys.country
            }]);
          } else {
            cb(null, []);
          }
        },
        (err) => {
          console.log(err);
          cb(err, null);
        }
      );
  }



}
