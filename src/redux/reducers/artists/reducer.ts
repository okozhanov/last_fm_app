import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ImagesType = Array<{
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega';
}>;

export type ArtistType = {
  name: string;
  image: ImagesType;
  listeners: string;
  playcount?: string;
  mbid: string;
  streamable: string;
  url: string;
};

export type ArtistShortType = {
  name: string;
  image: ImagesType;
  url: string;
};

export type ArtistDetailsType = {
  mbid: string;
  name: string;
  ontour: string;

  stats: {
    listeners: string;
    playcount: string;
  };
  streamable: string;

  similar: {artist: ArtistShortType[]};
  tags: {tag: {url: string; name: string}[]};

  bio: {
    content: string;
    links: {
      link: {
        rel: string;
        href: string;
        '#text': string;
      };
    };
    published: string;
    summary: string;
  };
  image: ImagesType;
};

type ArtistStateType = {
  artistsList: Nullable<ArtistType[]>;
  topArrtistsList: Nullable<ArtistType[]>;
  artistsDetails: Nullable<ArtistDetailsType>;
  loading: boolean;
  error: Nullable<string>;
};

export type ArtistParamsType = {
  artistName?: string;
  mbid?: string;
};

const initialState: ArtistStateType = {
  artistsList: [],
  topArrtistsList: [],
  artistsDetails: null,
  loading: false,
  error: null,
};

export const moduleName = 'artist';

const artistSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    /*
    Search artists
    */
    fetchArtistsRequest: (
      state: ArtistStateType,
      _action: PayloadAction<{name: string}>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchArtistsSuccess: (
      state: ArtistStateType,
      action: PayloadAction<Nullable<ArtistType[]>>,
    ) => {
      state.loading = false;
      state.artistsList = action.payload;
    },
    fetchArtistsFailure: (
      state: ArtistStateType,
      action: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSearchArtists: (state: ArtistStateType) => {
      state.artistsList = null;
      state.loading = false;
      state.error = null;
    },

    /*
    Top artists
    */
    fetchTopArtistsRequest: (state: ArtistStateType) => {
      state.loading = true;
      state.error = null;
    },
    fetchTopArtistsSuccess: (
      state: ArtistStateType,
      action: PayloadAction<Nullable<ArtistType[]>>,
    ) => {
      state.loading = false;
      state.topArrtistsList = action.payload;
    },
    fetchTopArtistsFailure: (
      state: ArtistStateType,
      action: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    /*
    Artist details
    */
    fetchArtistDetailsRequest: (
      state: ArtistStateType,
      _action: PayloadAction<ArtistParamsType>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchArtistDetailsSuccess: (
      state: ArtistStateType,
      action: PayloadAction<ArtistDetailsType>,
    ) => {
      state.loading = false;
      state.artistsDetails = action.payload;
    },
    fetchArtistDetailsFailure: (
      state: ArtistStateType,
      action: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = artistSlice.actions;

export default artistSlice.reducer;
