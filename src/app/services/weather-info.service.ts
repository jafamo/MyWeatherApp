import { Injectable } from '@angular/core';

import { WeatherLocation } from '../models/weather-location';
import { WeatherInfo } from '../models/weather-info';

@Injectable({
  providedIn: 'root'
})
export class WeatherInfoService {


  constructor() { }

  findCurrentWeather(location: WeatherLocation, cb: (err: Error, info: WeatherInfo) => void): void {
    console.log(`findCurrentWeather(${location.name})`);
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
    cb(null, info);
  }

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
      }
    });
  }




}
