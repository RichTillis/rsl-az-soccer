import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inclement-weather',
  templateUrl: './inclement-weather.page.html',
  styleUrls: ['./inclement-weather.page.scss'],
})
export class InclementWeatherPage implements OnInit {
  public pageTitle: string = "Inclement Weather";

  constructor() { }

  ngOnInit() {
  }

}
