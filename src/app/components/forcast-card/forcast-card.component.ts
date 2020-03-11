import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WeatherLocation} from "../../models/weather-location";
import {StoreService} from "../../services/store.service";
import {WeatherInfoService} from "../../services/weather-info.service";
import {WeatherInfo} from "../../models/weather-info";

@Component({
  selector: 'app-forcast-card',
  templateUrl: './forcast-card.component.html',
  styleUrls: ['./forcast-card.component.css']
})
export class ForcastCardComponent implements OnInit {

  public info: WeatherInfo;
  public location: WeatherLocation;
  public info2: WeatherInfo[] = [];
  public forecast: WeatherInfo[] = [];


  constructor(public router: ActivatedRoute,
              public store: StoreService,
              public service: WeatherInfoService,
              ) { }

  ngOnInit(): void {
    let ini = 0;
    let end = 5;
    let id = Number(this.router.snapshot.paramMap.get('id'));
    console.log(`[ForecastCardComponent] id`);
    this.location = this.store.findLocation(id);
    console.log("Mostramos el location" + this.location.id);
    console.log("Mostramos el nombre" + this.location.name);


    this.service.findCurrentWeather(this.location, (err, info) => {
      this.info = info;
    });
    console.log(this.info.ts);

    this.convert();


    /*
        this.service.findForecast(this.location, ini, end, (err, forecast )=> {
          this.forecast = forecast;

        });
    */

  }

  convert(){
    var a = new Date(this.info.ts );
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var dias=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var day = dias[a.getDay()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var timemm = day +', '+ month + ' ' + date + ', ' + year ;
    document.getElementById('datetime').innerHTML = timemm;

  }

}
