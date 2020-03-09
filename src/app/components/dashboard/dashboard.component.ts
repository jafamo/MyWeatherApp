import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {StoreService} from "../../services/store.service"; //obtener los datos del servicio


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router, private storeService: StoreService) { }

  ngOnInit(): void {
  }


  addLocation(){
    console.log('Ir a addLocation');
    this.router.navigateByUrl('/search');
  }

}
