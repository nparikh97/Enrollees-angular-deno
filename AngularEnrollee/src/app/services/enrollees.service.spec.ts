import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EnrolleesService } from './enrollees.service';

describe('EnrolleesService', () => {
  let service: EnrolleesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(EnrolleesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
