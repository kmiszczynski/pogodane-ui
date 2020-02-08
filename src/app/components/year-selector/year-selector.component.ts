import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {City} from "../../api/city";

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent implements OnInit {

  @Input() selectedYear: string;
  @Input() yearOptions: string[];
  @Input() selectedCity: City;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateToYear(event) {
    this.router.navigate([environment.weatherPath + '/' + this.selectedCity.technicalId + '/' + event]);
  }

  navigateToAllYears() {
    this.router.navigate([environment.weatherPath + '/' + this.selectedCity.technicalId]);
  }
}
