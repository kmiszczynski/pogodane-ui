import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent implements OnInit {

  @Input() yearOptions: string[];
  @Input() selectedCity: string;

  constructor() {
  }

  ngOnInit() {
  }

}
