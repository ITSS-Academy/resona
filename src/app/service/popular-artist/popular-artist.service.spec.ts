import { TestBed } from '@angular/core/testing';

import { PopularArtistService } from './popular-artist.service';

describe('PopularArtistService', () => {
  let service: PopularArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularArtistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
