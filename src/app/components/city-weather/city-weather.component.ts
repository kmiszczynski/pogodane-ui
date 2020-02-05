import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {City} from '../../api/city';
import {StaticDataService} from '../../services/static-data.service';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent implements OnInit {

  city: City = new City();
  constructor(private route: ActivatedRoute,
              private staticDataService: StaticDataService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.staticDataService.getCity(params.get('city'))
        .subscribe(city => this.city = city);
    });
  }

}
