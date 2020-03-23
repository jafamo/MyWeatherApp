import { WeatherInfoService } from 'src/app/services/weather-info.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(public route: Router,
              public router: ActivatedRoute) { }

  ngOnInit(): void {

    let id = Number(this.router.snapshot.paramMap.get('id'));
    console.log("Entramos en el ONINIT: "+id);

  }

  back(){
    console.log(`[ForecastComponent] back()`);
    this.route.navigateByUrl('/dashboard');
  }

}
