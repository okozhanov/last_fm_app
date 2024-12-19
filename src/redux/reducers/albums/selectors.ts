import {createSelector} from 'reselect';
import {moduleName} from './reducer';
import {RootState} from '../../store';
import {isEmpty, isNil} from 'lodash';

const albumsState = (state: RootState) => state[moduleName];

export const topAlbumsSelector = createSelector(albumsState, v => v.topAlbums);

export const albumDetailsSelector = createSelector(
  albumsState,
  v => v.albumDetails,
);

export const isLoadingAlbumsSelector = createSelector(
  albumsState,
  v => v.loading,
);

export const isPresentTopAlbumsSelector = createSelector(albumsState, v => {
  const albums = v.topAlbums;

  return !isEmpty(albums) && !isNil(albums);
});
