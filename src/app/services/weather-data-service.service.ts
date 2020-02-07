import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AllYearsCityData} from '../api/all-years-city-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataServiceService {

  private apiUrl: string = environment.apiBaseUrl;
  private weatherPath: string = environment.weatherPath;

  constructor(private httpClient: HttpClient) {
  }

  getAllYearsCityData(city: string): Observable<AllYearsCityData> {
    return this.httpClient.get<AllYearsCityData>(this.apiUrl + this.weatherPath + '/' + city);
  }
}
