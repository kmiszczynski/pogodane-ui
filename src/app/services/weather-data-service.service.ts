import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AllYearsCityData} from '../api/all-years-city-data';
import {AvailableYears} from '../api/available-years';
import {YearlyWeatherData} from "../api/yearly-weather-data";

@Injectable({
  providedIn: 'root'
})
export class WeatherDataServiceService {

  private apiUrl: string = environment.apiBaseUrl;
  private weatherPath: string = environment.weatherApiPath;
  private availableYearsPath: string = environment.availableYearsApiPath;

  constructor(private httpClient: HttpClient) {
  }

  getYearlyWeatherData(city: string, year: string): Observable<YearlyWeatherData> {
    return this.httpClient.get<YearlyWeatherData>(this.apiUrl + this.weatherPath + '/' + city + '/' + year);
  }

  getAllYearsCityData(city: string): Observable<AllYearsCityData> {
    return this.httpClient.get<AllYearsCityData>(this.apiUrl + this.weatherPath + '/' + city);
  }

  getAvailableYearsForCity(city: string): Observable<AvailableYears> {
    return this.httpClient.get<AvailableYears>(this.apiUrl + this.availableYearsPath + '/' + city);
  }
}
