import { spawn } from 'redux-saga/effects';

import albumsSaga from './reducers/albums/saga';
import artistsSaga from './reducers/artists/saga';

export default function* rootSaga() {
  yield spawn(albumsSaga);
  yield spawn(artistsSaga);
}
