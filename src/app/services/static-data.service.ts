import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Cities} from '../api/cities';
import {City} from '../api/city';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  private apiUrl: string = environment.apiBaseUrl;
  private cityPath: string = environment.cityApiPath;
  private citiesPath: string = environment.citiesApiPath;

  constructor(private httpClient: HttpClient) {
  }

  getCity(technicalId: string): Observable<City> {
    return this.httpClient.get<City>(this.apiUrl + this.cityPath + '/' + technicalId);
  }

  getCities(): Observable<Cities> {
    return this.httpClient.get<Cities>(this.apiUrl + this.citiesPath);
  }

  getFullMonthName(month: string): string {
    switch (month) {
      case '01': return 'Styczeń';
      case '02': return 'Luty';
      case '03': return 'Marzec';
      case '04': return 'Kwiecień';
      case '05': return 'Maj';
      case '06': return 'Czerwiec';
      case '07': return 'Lipiec';
      case '08': return 'Sierpień';
      case '09': return 'Wrzesień';
      case '10': return 'Październik';
      case '11': return 'Listopad';
      case '12': return 'Grudzień';
    }
  }
}
