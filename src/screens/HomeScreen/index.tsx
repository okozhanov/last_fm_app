import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTopAlbumRequest} from '../../redux/reducers/albums/reducer';
import Search from '../WelcomeScreen/components/Search';
import ThemedView from '../../components/ThemedView';
import Icon from '../../components/Icon';
import Typography from '../../components/Typograhy';
import Albums from './components/Albums';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SCREEN_NAMES from '../../constants/screenNames';
import type {RootStackParamList} from '../../navigator';
import useThemeColor from '../../hooks/useThemeColor';
import {
  fetchTopArtistsRequest,
  type ArtistType,
} from '../../redux/reducers/artists/reducer';
import Artists from './components/Artists';
import {isLoadingArtistsSelector} from '../../redux/reducers/artists/selectors';
import {
  isLoadingAlbumsSelector,
  isPresentTopAlbumsSelector,
} from '../../redux/reducers/albums/selectors';
import Loader from '../../components/Loader';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof SCREEN_NAMES.HOME
>;

const HomeScreen = (props: Props) => {
  const {artistName} = props.route.params || {};

  const [initialArtistName, setInitialArtistName] = useState<
    string | undefined
  >(artistName);

  const isPresentTopAlbums = useSelector(isPresentTopAlbumsSelector);
  const isArtistsLoading = useSelector(isLoadingArtistsSelector);
  const isAlbumsLoading = useSelector(isLoadingAlbumsSelector);

  const dispatch = useDispatch();

  const searchTopAlbums = useCallback(
    (_artist: ArtistType | {name: string; mbid?: string}) => {
      dispatch(
        fetchTopAlbumRequest({artistName: _artist?.name, mbid: _artist?.mbid}),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    if (initialArtistName) {
      searchTopAlbums({name: initialArtistName});
    } else {
      setInitialArtistName('');
      dispatch(fetchTopArtistsRequest());
    }
  }, [initialArtistName, dispatch, searchTopAlbums]);

  const mainColor = useThemeColor('main');

  const RenderBody = useCallback(() => {
    if (isArtistsLoading || isAlbumsLoading) {
      return <Loader />;
    }

    if (isPresentTopAlbums) {
      return <Albums />;
    }

    return <Artists setArtistName={setInitialArtistName} />;
  }, [isAlbumsLoading, isArtistsLoading, isPresentTopAlbums]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <Typography.Header2 color={mainColor}>
          {isPresentTopAlbums ? 'Top albums' : 'Top artists'}
        </Typography.Header2>
        <Icon name="logo" size={30} />
      </View>

      <Search
        initialName={initialArtistName}
        onSelectArtist={searchTopAlbums}
      />

      <RenderBody />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  logoContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default HomeScreen;
