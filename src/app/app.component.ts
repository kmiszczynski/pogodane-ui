import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StaticDataService} from './services/static-data.service';
import {City} from './api/city';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  citiesControl = new FormControl();
  cities: City[] = [];
  filteredCities: Observable<City[]>;
  selectedCity = '';

  constructor(private staticDataService: StaticDataService) {
  }

  ngOnInit() {
    this.staticDataService.getCities()
      .subscribe(cities => this.cities = cities.cities);
    this.filteredCities = this.citiesControl.valueChanges
      .pipe(
        map(name => name ? this._filter(name) : [])
      );
  }

  citySelected(event) {
    this.selectedCity = event.option.value;
  }

  cityPanelOpened() {
    this.citiesControl.setValue('');
  }

  private _filter(filterValue: string): City[] {
    filterValue = filterValue.toLocaleLowerCase();
    return this.cities.filter(city => city.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
