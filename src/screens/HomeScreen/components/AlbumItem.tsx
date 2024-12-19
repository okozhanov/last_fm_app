import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import type {AlbumType} from '../../../redux/reducers/albums/reducer';
import {COLORS} from '../../../constants/colors';
import SCREEN_NAMES from '../../../constants/screenNames';
import {getImageBySize} from '../../../utils/getters';
import ImageSafety from '../../../components/ImageSafety';
import Typography from '../../../components/Typograhy';

type Props = {
  item: AlbumType;
  navigation: any;
};

const AlbumItem = ({item, navigation}: Props) => {
  const {name, image, playcount} = item;

  const imagePath = getImageBySize(image, ['large', 'extralarge']);

  const onPressAlbum = () => {
    navigation.navigate(SCREEN_NAMES.ALBUM_DETAILS, {
      albumName: item?.name,
      artistName: item?.artist?.name,
      mbid: item?.mbid,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPressAlbum}>
      <ImageSafety imagePath={imagePath} />

      <View style={styles.nameContainer}>
        <Typography.Text1 weight="bold">{name}</Typography.Text1>

        {playcount && (
          <Typography.Caption1>Play count: {playcount}</Typography.Caption1>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    paddingVertical: 15,
    flexDirection: 'row',
  },

  nameContainer: {
    maxWidth: '80%',
    marginLeft: 15,
    justifyContent: 'space-between',
  },
});

export default AlbumItem;
