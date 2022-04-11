import { TestBed } from '@angular/core/testing';

import { OpenweathermapService } from './openweathermap.service';

describe('OpenweathermapService', () => {
  let service: OpenweathermapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenweathermapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
