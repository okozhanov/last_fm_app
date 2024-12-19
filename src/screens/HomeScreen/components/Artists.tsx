import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {
  isLoadingArtistsSelector,
  topArtistsListSelector,
} from '../../../redux/reducers/artists/selectors';
import Loader from '../../../components/Loader';
import type {
  ArtistParamsType,
  ArtistType,
} from '../../../redux/reducers/artists/reducer';
import ArtistCard from '../../ArtistDetailsScreen/components/ArtistCard';
import {FlatList} from 'react-native';

type Props = {
  setArtistName: (artistName: string) => void;
};

const Artists = (props: Props) => {
  const {setArtistName} = props;

  const topArtistsList = useSelector(topArtistsListSelector);
  const isLoading = useSelector(isLoadingArtistsSelector);

  const onPressAlbums = useCallback(
    (artistName: ArtistParamsType['artistName']) => {
      artistName && setArtistName(artistName);
    },
    [setArtistName],
  );

  if (isLoading) {
    return <Loader />;
  }

  return topArtistsList ? (
    <FlatList
      data={topArtistsList}
      renderItem={({item}: {item: ArtistType}) => {
        return <ArtistCard artist={item} onPressAlbums={onPressAlbums} />;
      }}
      keyExtractor={(item: ArtistType, index: number) => item.name + index}
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  ) : null;
};

export default Artists;
