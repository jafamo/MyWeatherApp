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

    //TODO
    //todo el código en una función
    let id = Number(this.router.snapshot.paramMap.get('id'));
    console.log("[ForecastCardComponent]: "+id);
    this.location = this.store.findLocation(id);
    console.log("Mi location:"+this.location);


    this.service.findForecast(this.location, this.ini, this.end, (err, forecast )=> {
      this.allForecast = forecast;

      if(forecast['cod']==200){
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

          var today = new Date();
          var dd = today.getDate();

          this.nextDay1.setTime(today.getTime() + 24 *60 * 60 *1000 );
          let duration = 2 // 2 dias
          this.nextDay2.setTime(today.getTime()+ ( duration * 24 * 60* 60 * 1000))

          // DIA ACTUAL
          if (this.getDayToday() ==  this.getNumDay(miTiempo)){
            //console.log("dia: "+this.objDias[i]['dia']+ " Temperatura: "+this.objDias[i]['temperatura']+" ");
            this.arrayDia0.push(this.objDias[i]); // devolver el dia actual
          }

          //DIA SIGUIENTE
          if(this.getNumDay(miTiempo) == this.nextDay1.getDate()){
            //console.log("Dia1: "+this.getNumDay(miTiempo)+"--"+this.objDias[i]['temperatura'] +" Dia 1: "+  this.nextDay1.getDate());
            //console.log("this.getNumDay(miTiempo) == this.nextDay1.getDate()"+this.nextDay1.getDate()  );
            this.arrayDia1.push(this.objDias[i]); // devolver el dia actual
          }

          //PASADO MAÑANA
          if(this.getNumDay(miTiempo) == this.nextDay2.getDate()){
            //console.log("this.getNumDay(miTiempo) == this.nextDay1.getDate()"+this.nextDay2.getDate()  );
            this.arrayDia2.push(this.objDias[i]);
          }

          //console.log("dia: "+this.objDias[i]['dia']+ " Temperatura: "+this.objDias[i]['temperatura']+" ");
          //this.MiForecast.push(this.objDias);
        }

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

}
