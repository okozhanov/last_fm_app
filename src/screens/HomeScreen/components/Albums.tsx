import React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {
  isLoadingAlbumsSelector,
  topAlbumsSelector,
} from '../../../redux/reducers/albums/selectors';
import {type AlbumType} from '../../../redux/reducers/albums/reducer';
import {isEmpty, isNil} from 'lodash';
import AlbumItem from './AlbumItem';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../../constants/colors';

const Albums = () => {
  const topAlbums: Nullable<AlbumType[]> = useSelector(topAlbumsSelector);
  const isLoading: boolean = useSelector(isLoadingAlbumsSelector);

  const navigation = useNavigation() as any;

  if ((isEmpty(topAlbums) || isNil(topAlbums)) && isLoading) {
    return <ActivityIndicator size="large" color={COLORS.grey} />;
  }

  return (
    <FlatList
      data={topAlbums}
      keyExtractor={(item: AlbumType, index: number) =>
        item.name + item?.mbid + index
      }
      renderItem={({item}: {item: AlbumType}) => {
        return <AlbumItem item={item} navigation={navigation} />;
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  );
};

export default Albums;
