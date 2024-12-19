import React from 'react';
import {StyleSheet, View} from 'react-native';
import Search from './components/Search';
import Button from '../../components/Button';
import ThemedView from '../../components/ThemedView';
import Typography from '../../components/Typograhy';
import useThemeColor from '../../hooks/useThemeColor';
import SCREEN_NAMES from '../../constants/screenNames';
import Icon from '../../components/Icon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigator';
import type {ArtistType} from '../../redux/reducers/artists/reducer';
import {useDispatch} from 'react-redux';
import {resetTopAlbums} from '../../redux/reducers/albums/reducer';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof SCREEN_NAMES.WELCOME
>;

const WelcomeScreen = ({navigation}: Props) => {
  const mainColor = useThemeColor('main');

  const dispatch = useDispatch();

  const onNavigateHome = (artist?: ArtistType) => {
    dispatch(resetTopAlbums());

    navigation.navigate(SCREEN_NAMES.HOME, {artistName: artist?.name});
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.logo}>
        <Icon name="logo" size={80} />
      </View>

      <Typography.Header1 style={styles.title} color={mainColor}>
        Welcome to FM app!
      </Typography.Header1>

      <Search onSelectArtist={onNavigateHome} resetOnSelect />

      <Button title="Browse the best!" onPress={() => onNavigateHome()} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },

  title: {
    marginBottom: 30,
  },

  logo: {
    position: 'absolute',
    top: 70,
  },
});

export default WelcomeScreen;
