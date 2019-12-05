import { TestBed } from '@angular/core/testing';

import { DataContactService } from './data-contact.service';

describe('DataContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataContactService = TestBed.get(DataContactService);
    expect(service).toBeTruthy();
  });
});
