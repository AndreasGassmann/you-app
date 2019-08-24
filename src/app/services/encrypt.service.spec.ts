import { TestBed } from '@angular/core/testing';

import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncryptService = TestBed.get(EncryptService);
    expect(service).toBeTruthy();
  });
});
