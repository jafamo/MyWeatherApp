import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WeatherInfo} from "../../models/weather-info";
import {WeatherLocation} from "../../models/weather-location";
import {WeatherInfoService} from "../../services/weather-info.service";
import {StoreService} from "../../services/store.service";


@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  public location: WeatherLocation;
  public info: WeatherInfo;

  constructor(public router: ActivatedRoute,
              public store: StoreService,
              public service: WeatherInfoService,
              public route: Router
             ) { }

  ngOnInit(): void {
    let id = Number(this.router.snapshot.paramMap.get('id'));
    console.log("Este es el id:"+id);
    this.location = this.store.findLocation(id);
    console.log("Mostramos el location" + this.location.id);

    this.service.findCurrentWeather(this.location, (err, info )=> {
      this.info = info;
    });

    //Si !== null  hacemos el localStorage

  }

  refresh(){
    console.log('TODO');
  }
  back(){
    console.log(`[WeatherDetailsComponentn] back()`);
    this.route.navigateByUrl('/dashboard');

  }

}
