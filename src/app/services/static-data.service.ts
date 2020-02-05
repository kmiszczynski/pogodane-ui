import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Cities} from '../api/cities';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  private apiUrl: string = environment.apiBaseUrl;
  private citiesPath: string = environment.citiesPath;

  constructor(private httpClient: HttpClient) {
  }

  getCities(): Observable<Cities> {
    return this.httpClient.get<Cities>(this.apiUrl + this.citiesPath);
  }
}
