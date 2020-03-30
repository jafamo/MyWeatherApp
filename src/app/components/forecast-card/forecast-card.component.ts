import { WeatherInfo } from './../../models/weather-info';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WeatherLocation} from "../../models/weather-location";
import {StoreService} from "../../services/store.service";
import {WeatherInfoService} from "../../services/weather-info.service";
import {NUMBER_TYPE} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.css']
})
export class ForecastCardComponent implements OnInit {

  public info: WeatherInfo;
  public location: WeatherLocation;
  public location1: WeatherLocation[]=[];
  public forecast: WeatherInfo[] = []

  public ini = 0;
  public end = 4;
  //variables para acceder desde el template
  public hora: Number;
  public min : Number;
  public dias: String[]=[];


  public allForecast: any[]=[];

  //variables para la recogida de datos de la API.
  public temp: number[]=[];



  //Estructuras finales
  public  arrayDia0:any[] = [];
  public  arrayDia1:any[] = [];
  public  arrayDia2:any[] = [];

  public dia0: string;
  public dia1: string;
  public dia2: string;
  public nextDay1 = new Date();
  public nextDay2 = new Date();


  public timemm: string;


  public objDias={};

  public MiForecast = [];

  constructor(public router: ActivatedRoute,
              public store: StoreService,
              public service: WeatherInfoService,
              ) { }

  ngOnInit(): void {

    //encapsular en un método

    let id = Number(this.router.snapshot.paramMap.get('id'));
    console.log("[ForecastCardComponent]: "+id);
    this.location = this.store.findLocation(id);
    console.log("Mi location:"+this.location);




    this.service.findForecast(this.location, this.ini, this.end, (err, forecast )=> {
      this.allForecast = forecast;


      if(forecast['cod']==200){

        //aqui recorremos por cada array de "list"
        //for(let i=0; i< 16; i++){


        //recorremos los 40 elementos de la lista que nos devuelve la API
        for(let i = 0; i< forecast['list'].length; i++){

          let miTiempo = forecast['list'][i].dt;

          this.objDias[i] = {
            "dia": this.getNumDay(miTiempo),
            "hora": this.getHour(miTiempo),
            "minuto": this.getMinute(miTiempo),
            "temperatura":forecast['list'][i]['main']['temp'],
            "icono": forecast['list'][i]['weather'][0]['icon'],
            'dt_txt': forecast['list'][i]['dt_txt'],
          };








          this.nextDay2.setDate(new Date().getDate()+2);
          this.nextDay1.setDate(new Date().getDate()+1);
          //console.log('Dia1: '+nextDay2);


          // DIA ACTUAL
          if (this.getDayToday() ==  this.getNumDay(miTiempo)){
            //console.log("dia: "+this.objDias[i]['dia']+ " Temperatura: "+this.objDias[i]['temperatura']+" ");
            this.arrayDia0.push(this.objDias); // devolver el dia actual


          }

          //DIA SIGUIENTE
          if(this.getNumDay(miTiempo) == this.nextDay1.getDate()){
            //console.log("dia: "+this.objDias[i]['dia']+ " Temperatura: "+this.objDias[i]['temperatura']+" ");
            this.arrayDia1.push(this.objDias); // devolver el dia actual


          }

          //PASADO MAÑANA
          if(this.getNumDay(miTiempo) == this.nextDay2.getDate()){
            //console.log("dia: "+this.objDias[i]['dia']+ " Temperatura: "+this.objDias[i]['temperatura']+" ");
            this.arrayDia2.push(this.objDias); // devolver el dia actual

          }


          //console.log("dia: "+this.objDias[i]['dia']+ " Temperatura: "+this.objDias[i]['temperatura']+" ");
          this.MiForecast.push(this.objDias);

          //console.log("Size: "+this.MiForecast);
          //console.log("mostramos el dia:" +this.objDias['dia']+" Tiempo:"+this.objDias['hora']+":"+this.objDias['minuto']+" Temp: "+forecast['list'][i]['main']['temp']+" Icono:"+forecast['list'][i]['weather'][0]['icon']);

        }


/*
        for(let variables of this.MiForecast){
          console.log("Las variables: "+variables[0]['temperatura']);
        }
        */

        //console.log('Num elemnts:'+Object.keys(this.objDias).length);
        /*
        let dia1 = [];
        for(let op=0; op< 10; op++){
          if(this.objDias[op].dia == this.objDias[0].dia)
          console.log(this.objDias[op].dia);
          console.log(this.objDias[op].temperatura);
        }
*/

      }else{
        console.log('No se han recuperado los datos de la API');
      }

    });



  }


  getDayToday():number{
    var today = new Date();
    var dd = today.getDate();
    return dd;
  }
  getNumDay(tiempo: number):number {
    let a = new Date(tiempo*1000)
    //console.log(a.getDate());
    //let dia;
    return Number(a.getDate());

  }
  getHour(tiempo: number){
    let hora =  new Date(tiempo*1000);
    return hora.getHours();
  }
  getMinute(tiempo: number){
    let minute = new Date(tiempo+1000);
    return minute.getMinutes();
  }

  getMonth(tiempo: number){
    let mes = new Date(tiempo*1000);
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let month = months[mes.getMonth()];
    return month;
  }








  convert(tiempo: Date): string{
    //let myInfo = this.getCurrentWeather();
    let a = new Date(tiempo);
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    this.dias=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let day = this.dias[a.getDay()];
    let date = a.getDate();
    this.hora = a.getHours();
    this.min = a.getMinutes();
    let sec = a.getSeconds();
    this.timemm = day +', '+ month + ' ' + date + ', ' + year ;
    return this.timemm;
    //document.getElementById('datetime').innerHTML = timemm;

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
