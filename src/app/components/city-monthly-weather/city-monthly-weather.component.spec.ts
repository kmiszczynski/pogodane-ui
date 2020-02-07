import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityMonthlyWeatherComponent } from './city-monthly-weather.component';

describe('CityMonthlyWeatherComponent', () => {
  let component: CityMonthlyWeatherComponent;
  let fixture: ComponentFixture<CityMonthlyWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityMonthlyWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityMonthlyWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
