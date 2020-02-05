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
  private cityPath: string = environment.cityPath;
  private citiesPath: string = environment.citiesPath;

  constructor(private httpClient: HttpClient) {
  }

  getCity(technicalId: string): Observable<City> {
    return this.httpClient.get<City>(this.apiUrl + this.cityPath + '/' + technicalId);
  }

  getCities(): Observable<Cities> {
    return this.httpClient.get<Cities>(this.apiUrl + this.citiesPath);
  }
}
