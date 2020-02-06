import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {City} from '../../api/city';
import {StaticDataService} from '../../services/static-data.service';
import {AllYearsCityData} from '../../api/all-years-city-data';
import {WeatherDataServiceService} from '../../services/weather-data-service.service';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent implements OnInit {

  allYearsCityData: AllYearsCityData;
  yearOptions: string[] = [];
  city: City;
  showAllYears = true;

  constructor(private route: ActivatedRoute,
              private staticDataService: StaticDataService,
              private weatherDataService: WeatherDataServiceService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.staticDataService.getCity(params.get('city'))
        .subscribe(city => {
          this.city = city;
          this.weatherDataService.getAllYearsCityData(city.technicalId).subscribe(result => {
            this.allYearsCityData = result;
            this.fillYearOptions();
          });
        });
    });
  }

  fillYearOptions() {
    this.allYearsCityData.yearlyCityData.map(yearlyData => this.yearOptions.push(yearlyData.year));
    this.yearOptions.sort();
  }

}
