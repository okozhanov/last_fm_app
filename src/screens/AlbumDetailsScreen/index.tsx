import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigator';
import SCREEN_NAMES from '../../constants/screenNames';
import {
  albumDetailsSelector,
  isLoadingAlbumsSelector,
} from '../../redux/reducers/albums/selectors';
import ThemedView from '../../components/ThemedView';
import {
  AlbumDetailsType,
  fetchAlbumDetailsRequest,
} from '../../redux/reducers/albums/reducer';
import Header from '../../components/Header';
import {get, isNil} from 'lodash';
import Loader from '../../components/Loader';
import Details from './components/Details';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof SCREEN_NAMES.ALBUM_DETAILS
>;

const AlbumDetailsScreen = (props: Props) => {
  const {
    route: {params},
  } = props;

  const isLoading = useSelector(isLoadingAlbumsSelector);
  const albumDetails: Nullable<AlbumDetailsType> =
    useSelector(albumDetailsSelector);

  const name = get(albumDetails, 'name', '');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbumDetailsRequest(params));
  }, [params, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemedView style={styles.container}>
      <Header title={name || ''} />

      {!isNil(albumDetails) && <Details albumDetails={albumDetails} />}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default AlbumDetailsScreen;
