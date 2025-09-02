import { TestBed } from '@angular/core/testing';

import { MoodPlaylistService } from './mood-playlist.service';

describe('MoodPlaylistService', () => {
  let service: MoodPlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodPlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
