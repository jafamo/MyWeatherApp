import { WeatherInfo } from './../../models/weather-info';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WeatherLocation} from "../../models/weather-location";
import {StoreService} from "../../services/store.service";
import {WeatherInfoService} from "../../services/weather-info.service";

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.css']
})
export class ForecastCardComponent implements OnInit {

  public info: WeatherInfo;
  public location: WeatherLocation;
  public forecast: WeatherInfo[] = [];
  public ini = 0;
  public end = 4;
  public hora: Number;
  public min : Number;
  public dias: String[]=[];



  constructor(public router: ActivatedRoute,
              public store: StoreService,
              public service: WeatherInfoService,
              ) { }

  ngOnInit(): void {

    this.getForecast();

  }


  convert(){
    let myInfo = this.getCurrentWeather();
    let a = new Date( myInfo.ts );
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    this.dias=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let day = this.dias[a.getDay()];
    let date = a.getDate();
    this.hora = a.getHours();
    this.min = a.getMinutes();
    let sec = a.getSeconds();
    let timemm = day +', '+ month + ' ' + date + ', ' + year ;
    document.getElementById('datetime').innerHTML = timemm;

  }

  getForecast(){

    console.log(`[ForecastCardComponent] getForecast()`);
    let ini = 0;
    let end = 4;
    let id = Number(this.router.snapshot.paramMap.get('id'));
    console.log(`[ForecastCardComponent] id: `+id);
    this.location = this.store.findLocation(id);

    this.service.findForecast(this.location, this.ini, this.end, (err, forecast )=> {
      this.forecast = forecast;
    });

  }


getCurrentWeather(){
  let id = Number(this.router.snapshot.paramMap.get('id'));
  console.log(`[ForecastCardComponent] id`);
  this.location = this.store.findLocation(id);

  this.service.findCurrentWeather(this.location, (err, info) => {
      this.info = info;
    });
    return this.info;

}

}
