import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { WeatherLocation } from '../../models/weather-location';
import {WeatherInfoService} from "../../services/weather-info.service";
import {WeatherInfo} from "../../models/weather-info";
import {Router} from "@angular/router";


@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  @Input()
  public location: WeatherLocation;

  @Output()
  public removed = new EventEmitter();

  public info: WeatherInfo;


  constructor(private weatherInfoService: WeatherInfoService, private router: Router) { }

  ngOnInit(): void {
    console.log(`[WeatherCardComponent] ngOnInit()`);
  this.refresh();
    /*this.weatherInfoService.findCurrentWeather(this.location, (err, info) =>{
      this.info = info;});*/
  }

  refresh(){
    console.log(`[WeatherCardComponent refresh()`);
    console.log('entramos en el refresh');
    this.weatherInfoService.findCurrentWeather(this.location, (err, info )=> {
      this.info = info;
    });
  }

  remove(){
    console.log(`[WeatherCardComponent remove()`);
    this.removed.emit(this.location);

  }
  showDetails(){
    console.log(`[WeatherCardComponent] showDetails()`);
    this.router.navigateByUrl(`/details/${this.location.id}`);
  }
  showForecast(){
    console.log(`[WeatherCardComponent] showForecast()`);
    this.router.navigateByUrl(`/forecast/${this.location.id}`);
  }
}
