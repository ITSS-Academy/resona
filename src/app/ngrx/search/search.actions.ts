// src/app/ngrx/search/search.actions.ts
import {createAction, props} from '@ngrx/store';
import {CategoryModel} from '../../models/category.model';
import {ProfileModel} from '../../models/profile.model';
import {PlaylistModel} from '../../models/playlist.model';
import {TrackModel} from '../../models/track.model';

export const searchCategories = createAction(
  '[Search] Search Categories',
  props<{ query: string }>()
);
export const searchCategoriesSuccess = createAction(
  '[Search] Search Categories Success',
  props<{ categories: CategoryModel[] }>()
);
export const searchCategoriesFailure = createAction(
  '[Search] Search Categories Failure',
  props<{ error: any }>()
);

export const searchProfiles = createAction(
  '[Search] Search Profiles',
  props<{ query: string }>()
);
export const searchProfilesSuccess = createAction(
  '[Search] Search Profiles Success',
  props<{ profiles: ProfileModel[] }>()
);
export const searchProfilesFailure = createAction(
  '[Search] Search Profiles Failure',
  props<{ error: any }>()
);

export const searchPlaylists = createAction(
  '[Search] Search Playlists',
  props<{ query: string }>()
);
export const searchPlaylistsSuccess = createAction(
  '[Search] Search Playlists Success',
  props<{ playlists: PlaylistModel[] }>()
);
export const searchPlaylistsFailure = createAction(
  '[Search] Search Playlists Failure',
  props<{ error: any }>()
);

export const searchTracks = createAction(
  '[Search] Search Tracks',
  props<{ query: string }>()
);
export const searchTracksSuccess = createAction(
  '[Search] Search Tracks Success',
  props<{ tracks: TrackModel[] }>()
);
export const searchTracksFailure = createAction(
  '[Search] Search Tracks Failure',
  props<{ error: any }>()
);
