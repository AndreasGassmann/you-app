import { TestBed } from '@angular/core/testing';

import { BoxService } from './box.service';

describe('3boxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoxService = TestBed.get(BoxService);
    expect(service).toBeTruthy();
  });
});
