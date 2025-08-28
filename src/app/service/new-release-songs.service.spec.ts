import { TestBed } from '@angular/core/testing';

import { NewReleaseSongsService } from './new-release-songs.service';

describe('NewReleaseSongsService', () => {
  let service: NewReleaseSongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewReleaseSongsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
