import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { WeatherLocation } from '../../models/weather-location';
import {WeatherInfoService} from "../../services/weather-info.service";
import {WeatherInfo} from "../../models/weather-info";
import {Router} from "@angular/router";
import {StoreService} from "../../services/store.service";
import {typeIsOrHasBaseType} from "tslint/lib/language/typeUtils";




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

  public info: WeatherInfo
  public myTemp = new Array;
  public myIcon = new Array;
  //public storeService: StoreService;

  constructor(public weatherInfoService: WeatherInfoService, public router: Router, public storeService: StoreService
              ) {
    this.storeService = storeService;

  }

  ngOnInit(): void {
    console.log(`[WeatherCardComponent] ngOnInit()`);
    if( localStorage.getItem('locations') ){
    //if( Array.isArray(localStorage.getItem('locations')) || localStorage.getItem('locations').length>0 ){
      console.log("Entramos aqui: "+localStorage.getItem('locations').length);
    let variable = JSON.parse(localStorage.getItem('locations'));
    //console.log('mi variable: '+variable[0]['name']);
    this.location = localStorage.getItem('locations') ? JSON.parse(localStorage.getItem('locations')) : [];
    console.log('aqui esta el location:'+this.location);

    }
    this.refresh();
    /*this.weatherInfoService.findCurrentWeather(this.location, (err, info) =>{
      this.info = info;});*/
  }

  refresh(){
    console.log(`[WeatherCardComponent refresh()`);
    console.log('entramos en el refresh');

    let myArray: WeatherLocation[] = JSON.parse(localStorage.getItem('locations'));
    let myInfo: WeatherInfo[]=[];

    for(let i=0; i< myArray.length; i++) {

      this.weatherInfoService.findCurrentWeather(this.location[i], (err, info) => {
        this.info = info;
        //console.log("devolvemos el info"+this.info.temp);
        this.myTemp.push( this.info.temp);
        this.myIcon.push( this.info.icon);
        //console.log('temperatura:'+this.myTemp[i]);
      },
      );
    }
  }

  remove(id: number){
    this.removed.emit(this.location['id']);
    this.storeService.removeLocation(this.location[id].id);
    window.location.reload();

  }
  showDetails(id: number){
    console.log("obtenemos el id"+id);
    console.log(`[WeatherCardComponent] showDetails()`);
    this.router.navigateByUrl(`/details/${id}`);
    //this.router.navigateByUrl(`/details/${this.location.id}`);
  }
  showForecast(id: number){
    console.log(`[WeatherCardComponent] showForecast()`);
    this.router.navigateByUrl(`/forecast/${id}`);
  }
}
