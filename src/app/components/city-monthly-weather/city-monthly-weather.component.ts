import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {City} from '../../api/city';
import {StaticDataService} from '../../services/static-data.service';
import {WeatherDataServiceService} from '../../services/weather-data-service.service';
import {YearlyWeatherData} from '../../api/yearly-weather-data';

@Component({
  selector: 'app-city-monthly-weather',
  templateUrl: './city-monthly-weather.component.html',
  styleUrls: ['./city-monthly-weather.component.css']
})
export class CityMonthlyWeatherComponent implements OnInit {

  city: City;
  year: string;
  yearOptions: string[] = [];
  yearlyWeatherData: YearlyWeatherData;

  maxTemperatureChartData;
  minTemperatureChartData;
  avgTemperatureChartData;
  maxSnowHeightChartData;
  daysWithSnowChartData;
  rainfallAmountChartData;
  daysWithRainChartData;
  daysWithRainPieChartData;
  daysWithSnowPieChartData;

  // chartOptions
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = false;
  showLabels = true;
  showLegend = false;
  trimLabels = false;

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
          this.weatherDataService.getYearlyWeatherData(city.technicalId, this.year).subscribe(yearlyCityData => {
            this.yearlyWeatherData = yearlyCityData;
            this.maxTemperatureChartData = this.produceBarChartData('maximumTemperature');
            this.minTemperatureChartData = this.produceBarChartData('minimumTemperature');
            this.avgTemperatureChartData = this.produceBarChartData('averageTemperature');
            this.maxSnowHeightChartData = this.produceBarChartData('maximumSnowHeight');
            this.daysWithSnowChartData = this.produceBarChartData('daysWithSnow');
            this.rainfallAmountChartData = this.produceBarChartData('rainfallAmount');
            this.daysWithRainChartData = this.produceBarChartData('daysWithRain');

            this.daysWithRainPieChartData = this.produce365chart(
              this.yearlyWeatherData.yearlyCityData.daysWithRain, 'Dni z deszczem', 'Dni bez deszczu');
            this.daysWithSnowPieChartData = this.produce365chart(
              this.yearlyWeatherData.yearlyCityData.daysWithSnow, 'Dni z opadem śniegu', 'Dni bez opadu śniegu');
          });
        });
    });
  }

  produce365chart(yValue: number, valueLabel: string, restOfValuesLabel: string) {
    const restOfValues = 365 - yValue;
    const result = {
      data: [],
      allDataExists: true
    };
    result.data.push({
      name: valueLabel,
      value: yValue
    });
    result.data.push({
      name: restOfValuesLabel,
      value: restOfValues
    });

    return result;
  }

  produceBarChartData(yProperty: string) {
    const result = {
      data: [],
      allDataExists: true
    };
    this.yearlyWeatherData.monthlyCityData.forEach(monthData => {
      if (!monthData[yProperty] && monthData[yProperty] !== 0) {
        result.allDataExists = false;
        return result;
      }
      result.data.push({
        name: this.staticDataService.getFullMonthName(monthData.month),
        value: monthData[yProperty]
      });
    });
    result.allDataExists = !(result.data.every(entry => entry.value === 0));
    return result;
  }

}
