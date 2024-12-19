import {all, call, put, takeLatest} from 'redux-saga/effects';
import {fetchTopAlbums, fetchAlbumDetails} from '../../../api/lastFmApi';

import {
  fetchTopAlbumRequest,
  fetchTopAlbumSuccess,
  fetchTopAlbumFailure,
  fetchAlbumDetailsRequest,
  fetchAlbumDetailsSuccess,
  fetchAlbumDetailsFailure,
  type AlbumParamsType,
} from './reducer';
import {get, isNil} from 'lodash';
import {PayloadAction} from '@reduxjs/toolkit';
import type {ArtistParamsType} from '../artists/reducer';

function* fetchTopAlbumsSaga(
  action: PayloadAction<ArtistParamsType>,
): Generator<any, void> {
  try {
    const {artistName: name, mbid} = action.payload;

    let params = {};

    if (mbid) {
      params = {mbid};
    } else {
      params = {artist: name};
    }

    const response = yield call(fetchTopAlbums, params);

    const albums = get(response, 'topalbums.album', []);

    yield put(fetchTopAlbumSuccess(!isNil(albums) ? albums : []));
  } catch (error: any) {
    yield put(fetchTopAlbumFailure(error.message));
  }
}

function* fetchAlbumDetailsSaga(
  action: PayloadAction<AlbumParamsType>,
): Generator<any, void> {
  try {
    const {artistName, albumName, mbid} = action.payload;

    let params = {};

    if (mbid) {
      params = {mbid};
    } else {
      params = {artist: artistName, album: albumName};
    }

    const response = yield call(fetchAlbumDetails, params);

    const albumDetails = get(response, 'album', []);

    yield put(fetchAlbumDetailsSuccess(albumDetails));
  } catch (error: any) {
    yield put(fetchAlbumDetailsFailure(error.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(fetchTopAlbumRequest.type, fetchTopAlbumsSaga),
    takeLatest(fetchAlbumDetailsRequest.type, fetchAlbumDetailsSaga),
  ]);
}
