import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {
  ArtistParamsType,
  ArtistShortType,
} from '../../../redux/reducers/artists/reducer';
import {getImageBySize} from '../../../utils/getters';
import ImageSafety from '../../../components/ImageSafety';
import {COLORS} from '../../../constants/colors';
import Button from '../../../components/Button';
import {isFunction} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import SCREEN_NAMES from '../../../constants/screenNames';
import useThemeColor from '../../../hooks/useThemeColor';

type Props = {
  artist: ArtistShortType;
  onPressArtist?: (artistName: ArtistParamsType['artistName']) => void;
  onPressAlbums?: (artistName: ArtistParamsType['artistName']) => void;
};

const ArtistCard = (props: Props) => {
  const {
    artist: {image, name},
    onPressArtist,
    onPressAlbums,
  } = props;

  const imagePath = getImageBySize(image, ['medium', 'large']);
  const navigation = useNavigation() as any;

  const _onPressArtist = () => {
    if (isFunction(onPressArtist)) {
      onPressArtist(name);
      return;
    }

    navigation.navigate(SCREEN_NAMES.ARTIST_DETAILS, {artistName: name});
  };

  const _onPressAlbums = () => {
    if (isFunction(onPressAlbums)) {
      onPressAlbums(name);
      return;
    }

    navigation.reset({
      index: 1,
      routes: [
        {name: SCREEN_NAMES.WELCOME},
        {name: SCREEN_NAMES.HOME, params: {artistName: name}},
      ],
    });
  };

  const textColor = useThemeColor('text');

  return (
    <View style={styles.container}>
      <ImageSafety imagePath={imagePath} size={40} />

      <View style={styles.buttonsContainer}>
        <Button
          title={name}
          type="transparent"
          containerStyle={styles.nameContainer}
          textProps={{color: textColor}}
          onPress={_onPressArtist}
        />

        <Button
          title="View albums"
          onPress={_onPressAlbums}
          type="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    marginTop: 5,
    borderBottomColor: COLORS.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  nameContainer: {
    maxWidth: '70%',
    marginLeft: 10,
  },
});

export default ArtistCard;
