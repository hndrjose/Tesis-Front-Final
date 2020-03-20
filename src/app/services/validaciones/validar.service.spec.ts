import { TestBed } from '@angular/core/testing';

import { ValidarService } from './validar.service';

describe('ValidarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidarService = TestBed.get(ValidarService);
    expect(service).toBeTruthy();
  });
});
