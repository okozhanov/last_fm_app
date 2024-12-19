import queryString from 'query-string';

const API_KEY = '8c8ac06c99b5287fcf7414e7b5479165';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export const fetchAtrists = async (params: {artist: string}) => {
  const url = queryString.stringifyUrl({
    url: BASE_URL,
    query: {
      method: 'artist.search',
      ...params,
      api_key: API_KEY,
      format: 'json',
    },
  });

  const response = await fetch(url);
  return response.json();
};

export const fetchTopArtists = async () => {
  const url = queryString.stringifyUrl({
    url: BASE_URL,
    query: {
      method: 'chart.gettopartists',
      api_key: API_KEY,
      format: 'json',
    },
  });

  const response = await fetch(url);
  return response.json();
};

export const fetchTopAlbums = async (params: {
  artist?: string;
  mbid?: string;
}) => {
  const url = queryString.stringifyUrl({
    url: BASE_URL,
    query: {
      method: 'artist.gettopalbums',
      ...params,
      api_key: API_KEY,
      format: 'json',
    },
  });

  const response = await fetch(url);
  return response.json();
};

export const fetchAlbumDetails = async (params: {
  artist?: string;
  album?: string;
  mbid?: string;
}) => {
  const url = queryString.stringifyUrl({
    url: BASE_URL,
    query: {
      method: 'album.getinfo',
      ...params,
      api_key: API_KEY,
      format: 'json',
    },
  });

  const response = await fetch(url);
  return response.json();
};

export const fetchArtistDetails = async (params: {
  artist?: string;
  mdid?: string;
}) => {
  const url = queryString.stringifyUrl({
    url: BASE_URL,
    query: {
      method: 'artist.getinfo',
      ...params,
      api_key: API_KEY,
      format: 'json',
    },
  });

  const response = await fetch(url);
  return response.json();
};
