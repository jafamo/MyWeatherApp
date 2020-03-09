import { TestBed } from '@angular/core/testing';

import { WeatherLocationService } from './weather-location.service';

describe('WeatherLocationService', () => {
  let service: WeatherLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
