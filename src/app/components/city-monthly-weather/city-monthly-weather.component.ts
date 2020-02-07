import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {City} from '../../api/city';
import {StaticDataService} from '../../services/static-data.service';
import {WeatherDataServiceService} from '../../services/weather-data-service.service';

@Component({
  selector: 'app-city-monthly-weather',
  templateUrl: './city-monthly-weather.component.html',
  styleUrls: ['./city-monthly-weather.component.css']
})
export class CityMonthlyWeatherComponent implements OnInit {

  city: City;
  year: string;
  yearOptions: string[] = [];

  constructor(private route: ActivatedRoute,
              private staticDataService: StaticDataService,
              private weatherDataService: WeatherDataServiceService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.year = params.get('year');
      this.staticDataService.getCity(params.get('city'))
        .subscribe(city => {
          this.city = city;
          this.weatherDataService.getAvailableYearsForCity(city.technicalId).subscribe(years => this.yearOptions = years.years);
        });
    });
  }

}
