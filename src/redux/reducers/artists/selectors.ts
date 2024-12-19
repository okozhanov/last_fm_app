import {createSelector} from 'reselect';
import {moduleName} from './reducer';
import {RootState} from '../../store';

const artistsState = (state: RootState) => state[moduleName];

export const artistsListSelector = createSelector(
  artistsState,
  v => v.artistsList,
);

export const topArtistsListSelector = createSelector(
  artistsState,
  v => v.topArrtistsList,
);

export const artistDetailsSelector = createSelector(
  artistsState,
  v => v.artistsDetails,
);

export const isLoadingArtistsSelector = createSelector(
  artistsState,
  v => v.loading,
);
