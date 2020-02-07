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

  // chart options
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  timeline = true;
  autoscale = true;

  maxTempColorScheme = {
    domain: ['#a40900']
  };
  minTempColorScheme = {
    domain: ['#002da4']
  };
  avgTempColorScheme = {
    domain: ['#a44600']
  };
  snowColorScheme = {
    domain: ['#05a49c']
  };
  maxRainfallAmountColorScheme = {
    domain: ['#0046a4']
  };
  daysWithrainColorScheme = {
    domain: ['#0046a4']
  };
  yearlyMaxTempChartData;
  yearlyMinTempChartData;
  yearlyMaxSnowHeightChartData;
  yearlyMaxRainfallAmountChartData;
  yearlyDaysWithRainChartData;
  yearlyAverageTempChartData;
  yearlyDaysWithSnowChartData;

  constructor(private route: ActivatedRoute,
              private staticDataService: StaticDataService,
              private weatherDataService: WeatherDataServiceService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.staticDataService.getCity(params.get('city'))
        .subscribe(city => {
          this.city = city;
          this.weatherDataService.getAvailableYearsForCity(city.technicalId).subscribe(years => this.yearOptions = years.years);
          this.weatherDataService.getAllYearsCityData(city.technicalId).subscribe(result => {
            this.allYearsCityData = result;
            this.yearlyMaxTempChartData = this.produceYearlyLineChartData('year', 'maximumTemperature', 'Maksymalna temperatura', true);
            this.yearlyMinTempChartData = this.produceYearlyLineChartData('year', 'minimumTemperature', 'Minimalna temperatura', true);
            this.yearlyMaxRainfallAmountChartData = this.produceYearlyLineChartData('year', 'maximumRainfallAmount',
              'Maksymalny opad dobowy (mm)', true);
            this.yearlyMaxSnowHeightChartData = this.produceYearlyLineChartData('year', 'maximumSnowHeight',
              'Max. wys. pokrywy śnieżnej', true);
            this.yearlyDaysWithRainChartData = this.produceYearlyLineChartData('year', 'daysWithRain',
              'Dni z opadami', true);
            this.yearlyAverageTempChartData = this.produceYearlyLineChartData('year', 'averageTemperature',
              'Średnia temperatura', true);
            this.yearlyDaysWithSnowChartData = this.produceYearlyLineChartData('year', 'daysWithSnow',
              'Dni z opadami śniegu', true);
          });
        });
    });
  }

  produceYearlyLineChartData(xProperty: string, yProperty: string, valueDescription: string, dropOnZeroValue: boolean) {
    const result = [
      {
        name: valueDescription,
        series: []
      }
    ];
    this.allYearsCityData.yearlyCityData.forEach(cityData => {
      if (!dropOnZeroValue || cityData[yProperty]) {
        result[0].series.push({
          name: cityData[xProperty],
          value: cityData[yProperty]
        });
      }
    });
    return result;
  }
}
