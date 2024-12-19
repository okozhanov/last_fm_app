import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import ThemedView from '../../components/ThemedView';
import {useDispatch, useSelector} from 'react-redux';
import {
  artistDetailsSelector,
  isLoadingArtistsSelector,
} from '../../redux/reducers/artists/selectors';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Details from './components/Details';
import {fetchArtistDetailsRequest} from '../../redux/reducers/artists/reducer';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigator';
import SCREEN_NAMES from '../../constants/screenNames';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof SCREEN_NAMES.ARTIST_DETAILS
>;

const ArtistDetailsScreen = (props: Props) => {
  const {
    route: {params},
  } = props;

  const artistDetails = useSelector(artistDetailsSelector);
  const isLoading = useSelector(isLoadingArtistsSelector);

  const {name} = artistDetails || {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArtistDetailsRequest(params));
  }, [dispatch, params]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemedView style={styles.container}>
      <Header title={name || ''} />

      {artistDetails && <Details artistDetails={artistDetails} />}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default ArtistDetailsScreen;
