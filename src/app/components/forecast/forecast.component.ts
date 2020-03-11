import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {

  }

  back(){
    console.log(`[ForecastComponent] back()`);
    this.route.navigateByUrl('/dashboard');
  }

}
