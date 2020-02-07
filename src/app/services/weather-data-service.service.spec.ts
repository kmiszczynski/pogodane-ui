import { TestBed } from '@angular/core/testing';

import { WeatherDataServiceService } from './weather-data-service.service';

describe('WeatherDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherDataServiceService = TestBed.get(WeatherDataServiceService);
    expect(service).toBeTruthy();
  });
});
