import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {
  fetchArtistDetails,
  fetchAtrists,
  fetchTopArtists,
} from '../../../api/lastFmApi';

import {
  fetchArtistsRequest,
  fetchArtistsSuccess,
  fetchArtistsFailure,
  resetSearchArtists,
  fetchTopArtistsRequest,
  fetchTopArtistsSuccess,
  fetchTopArtistsFailure,
  fetchArtistDetailsRequest,
  fetchArtistDetailsSuccess,
  fetchArtistDetailsFailure,
  type ArtistType,
  type ArtistParamsType,
} from './reducer';
import {resetTopAlbums} from '../albums/reducer';
import {get, isNil, isNull} from 'lodash';
import {PayloadAction} from '@reduxjs/toolkit';
import {topArtistsListSelector} from './selectors';

function* searchArtistsSaga(
  action: PayloadAction<ArtistType>,
): Generator<any, void> {
  const name = get(action, 'payload.name');

  try {
    if (!name) {
      const topArtists = yield select(topArtistsListSelector);
      if (isNil(topArtists)) {
        yield put(fetchTopArtistsRequest());
      }

      yield put(resetSearchArtists());
      yield put(resetTopAlbums());
      return;
    }

    const response = yield call(fetchAtrists, {artist: name});
    const artists = get(response, 'results.artistmatches.artist', []);

    yield put(fetchArtistsSuccess(!isNull(artists) ? artists : []));
  } catch (error: any) {
    yield put(fetchArtistsFailure(error?.message));
  }
}

function* searchTopArtistsSaga(): Generator<any, void> {
  try {
    const response = yield call(fetchTopArtists);

    const artists = get(response, 'artists.artist', []);

    yield put(fetchTopArtistsSuccess(!isNull(artists) ? artists : []));
  } catch (error: any) {
    yield put(fetchTopArtistsFailure(error?.message));
  }
}

function* fetchArtistDetailsSaga(
  action: PayloadAction<ArtistParamsType>,
): Generator<any, void> {
  try {
    const {artistName: artist, mbid} = action.payload;
    let params = {};

    if (mbid) {
      params = {mbid};
    } else {
      params = {artist};
    }

    const response = yield call(fetchArtistDetails, params);

    yield put(fetchArtistDetailsSuccess(response?.artist));
  } catch (error: any) {
    yield put(fetchArtistDetailsFailure(error?.message));
  }
}

export default function* saga() {
  yield all([takeLatest(fetchArtistsRequest.type, searchArtistsSaga)]);
  yield all([takeLatest(fetchTopArtistsRequest.type, searchTopArtistsSaga)]);
  yield all([
    takeLatest(fetchArtistDetailsRequest.type, fetchArtistDetailsSaga),
  ]);
}
