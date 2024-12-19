import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {
  ArtistParamsType,
  ArtistType,
  ImagesType,
} from '../artists/reducer';

type ArtistAlbum = Pick<ArtistType, 'name' | 'mbid' | 'url'>;

export type AlbumType = {
  artist: ArtistAlbum;
  image: ImagesType;
  mbid?: string;
  name: string;
  playcount: number;
  url: string;
};

export type TrackType = {
  name: string;
  artist: ArtistAlbum;
  duration: number;
  streamable: {fulltrack: string; '#text': string};
  url: string;
  '@attr': {rank: number};
};

export type AlbumDetailsType = {
  name: string;
  artist: string;
  image: ImagesType;
  listeners: string;
  tags: {tag: {url: string; name: string}[]};
  playcount: string;
  url: string;
  tracks: {track: TrackType[]};
};

type AlbumStateType = {
  topAlbums: Nullable<AlbumType[]>;
  albumDetails: Nullable<AlbumDetailsType>;
  loading: boolean;
  error: Nullable<string>;
};

export type AlbumParamsType = {
  albumName?: string;
  artistName?: string;
  mbid?: string;
};

const initialState: AlbumStateType = {
  topAlbums: null,
  albumDetails: null,
  loading: false,
  error: null,
};

export const moduleName = 'album';

const albumSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    /*
    Top albums
    */
    fetchTopAlbumRequest: (
      state: AlbumStateType,
      _action: PayloadAction<ArtistParamsType>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchTopAlbumSuccess: (
      state: AlbumStateType,
      action: PayloadAction<AlbumType[]>,
    ) => {
      state.loading = false;
      state.topAlbums = action.payload;
    },
    fetchTopAlbumFailure: (
      state: AlbumStateType,
      action: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetTopAlbums: (state: AlbumStateType) => {
      state.topAlbums = null;
      state.loading = false;
      state.error = null;
    },

    /*
    Album details
    */
    fetchAlbumDetailsRequest: (
      state: AlbumStateType,
      _action: PayloadAction<AlbumParamsType>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchAlbumDetailsSuccess: (
      state: AlbumStateType,
      action: PayloadAction<AlbumDetailsType>,
    ) => {
      state.loading = false;
      state.albumDetails = action.payload;
    },
    fetchAlbumDetailsFailure: (
      state: AlbumStateType,
      action: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAlbumDetailsRequest,
  fetchAlbumDetailsSuccess,
  fetchAlbumDetailsFailure,
  resetTopAlbums,
  fetchTopAlbumRequest,
  fetchTopAlbumSuccess,
  fetchTopAlbumFailure,
} = albumSlice.actions;

export default albumSlice.reducer;
