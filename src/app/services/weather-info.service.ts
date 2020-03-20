import { Injectable } from '@angular/core';
import { WeatherLocation } from '../models/weather-location';
import { WeatherInfo } from '../models/weather-info';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class WeatherInfoService {

  private key = 'c60fcc50dea05a84f20dacca2a03dea7';
  private url = 'https://api.openweathermap.org/data/2.5/weather?q=';//{city name}&appid={your api key}

  constructor(public http: HttpClient) { }

  findCurrentWeather(location: WeatherLocation, cb: (err: Error, info: WeatherInfo) => void): void {
    console.log(`findCurrentWeather(${location.name})`);

    this.http.get<any>(this.url, {params: {APPID: this.key,  id: location.id.toString(), units:'metric' }})
      .subscribe((info) => {
          let info1 = {
            ts: Date.now(),
            desc: info.weather[0].description,
            icon: info.weather[0].icon,
            temp: info.main.temp,
            temp_max: info.main.temp_max,
            temp_min: info.main.temp_min,
            clouds: info.clouds.all,
            humidity: info.main.humidity,
            pressure: info.main.pressure,
            wind: info.wind.speed

          }
          if (info) {
            cb(null, info1);
          } else {
            cb(null, info1);
          }
        },
        (err) => {
          console.log("Hay un error en WeatherInfoService:" + err);
          cb(err, null);
        }
      );
  }
    /*
    let info = {
      ts: Date.now(),
      desc: 'scattered clouds',
      icon: '09d',
      temp: 13, //main.temp
      temp_max: 13, // main.temp_max
      temp_min: 13, // main.temp_min
      clouds: 75, // clouds.all
      humidity: 58, // main.humidity
      pressure: 1005, // main.pressure
      wind: 5.1 // wind.speed
    };
    cb(null, info1);*/


  /**Recuperar toda la información del clima de todas las ubicaciones
   *
   * @param location
   * @param ini
   * @param end
   * @param cb
   */
  findForecast(location: WeatherLocation, ini: number, end: number, cb:(err:Error, forecast: WeatherInfo[])=> void): void{
    console.log(`findForecast(${location.name}, ${ini},${end})`);

    this.findCurrentWeather(location, (err, info) =>{
      if(err) {
        console.log('error en el if del findForecast');
        cb(err, null);
      }
      else{
        console.log('Entramos en el findForecast');
        let forecast: WeatherInfo[] = [];
        for(let i=0; i < 6; i++) {
          forecast.push(info);
        }
        cb(null, forecast);
      }
    });
  }


}
