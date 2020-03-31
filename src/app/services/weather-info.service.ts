import { Injectable } from '@angular/core';
import { WeatherLocation } from '../models/weather-location';
import { WeatherInfo } from '../models/weather-info';
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler/src/util";


@Injectable({
  providedIn: 'root'
})
export class WeatherInfoService {

  private key = 'c60fcc50dea05a84f20dacca2a03dea7';
  private url_weather = 'https://api.openweathermap.org/data/2.5/weather?q=';//{city name}&appid={your api key}
  private url_forecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';//{city name}&appid={your api key}
  public test = [];

  constructor(public http: HttpClient) { }

  findCurrentWeather(location: WeatherLocation, cb: (err: Error, info: WeatherInfo) => void): void {
    //console.log(`findCurrentWeather(${location[0].name})`);

    console.log("Aqui el location: "+location.id);
    //console.log("Mostramos el id:"+location[0].id);

    this.http.get<any>(this.url_weather, {params: {APPID: this.key, id: location.id.toString(), units: 'metric'}})
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
/* original
  findForecast(location: WeatherLocation, ini: number, end: number, cb:(err:Error, forecast: WeatherInfo[])=> void): void{
    console.log(`findForecast(${location.name}, ${ini},${end})`);

    this.http.get<any>(this.url_forecast,{params:{ APPID: this.key, id: location.id.toString(), units: 'metric'}  }).subscribe(
      (forecast) =>{
        this.findCurrentWeather(location, (err, info) =>{
          if(err) {
            console.log('error en el if del findForecast');
            cb(err, null);
          }
          else{
            let forecast: WeatherInfo[] = [];
            for(let i=0; i < 6; i++) {
              forecast.push(info);
              console.log('vamos añadiendo el forecast'+forecast[i].desc);
            }
            console.log('Salimos en el findForecast');
            cb(null, forecast);
          }
        });
      }

    );

  }

*/





  findForecast(location: WeatherLocation, ini: number, end: number, cb:(err:Error, data: any[])=> void): void{
    console.log(`findForecast(${location.name}, ${ini},${end})`);


    this.http.get(this.url_forecast,{params:{ APPID: this.key, id: location.id.toString(), units: 'metric'}  }).subscribe(
      (allForecast: any[]) =>{
        //console.log(pruebas.list[0]);
        console.log(allForecast);
        if(allForecast['cod'] ==200){
          console.log("devolvemos los valores de la API");
          //return allForecast;
          cb( null,allForecast);
        }else{
          console.log('Error al conectar con la API');
          return null;
        }



        /*this.findCurrentWeather(location, (err, info) =>{
          if(err) {
            console.log('error en el if del findForecast');
            cb(err, null);
          }
          else{
            let forecast: WeatherInfo[] = [];
            for(let i=0; i < 6; i++) {
              forecast.push(info);
              console.log('vamos añadiendo el forecast'+forecast[i].desc);
            }
            console.log('Salimos en el findForecast');
            cb(null, forecast);
          }
        });*/
      }

    );

  }




}
