import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {City} from '../../api/city';
import {Observable} from 'rxjs';
import {StaticDataService} from '../../services/static-data.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnChanges {
  @Input() selectedCityName: string;
  citiesControl = new FormControl();
  cities: City[] = [];
  filteredCities: Observable<City[]>;

  constructor(private staticDataService: StaticDataService,
              private router: Router) {
  }

  ngOnInit() {
    this.citiesControl = new FormControl(this.selectedCityName);
    this.staticDataService.getCities()
      .subscribe(cities => this.cities = cities.cities);
    this.filteredCities = this.citiesControl.valueChanges
      .pipe(
        map(name => name ? this._filter(name) : [])
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: SimpleChange = changes.selectedCityName;
    this.citiesControl.setValue(change.currentValue);
  }

  citySelected(event) {
    const selectedCity = event.option.value;
    const selectedCityFullName = this.getCityByTechnicalId(selectedCity).name;
    this.citiesControl.setValue(selectedCityFullName);
    this.router.navigate([environment.weatherPath + '/' + selectedCity]);
  }

  clearOnChangePrompt() {
    this.citiesControl.setValue('');
  }

  getCityByTechnicalId(technicalId: string) {
    return this.cities.find(city => city.technicalId === technicalId);
  }

  private _filter(filterValue: string): City[] {
    filterValue = filterValue.toLocaleLowerCase();
    return this.cities.filter(city => city.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
