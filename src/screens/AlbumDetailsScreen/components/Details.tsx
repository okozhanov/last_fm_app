import React, {useCallback} from 'react';
import {FlatList, StyleSheet, useWindowDimensions, View} from 'react-native';
import type {
  AlbumDetailsType,
  TrackType,
} from '../../../redux/reducers/albums/reducer';
import {getImageBySize} from '../../../utils/getters';
import {COLORS} from '../../../constants/colors';
import {get} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import SCREEN_NAMES from '../../../constants/screenNames';
import ImageSafety from '../../../components/ImageSafety';
import Typography from '../../../components/Typograhy';
import Button from '../../../components/Button';
import Track from './Track';

type Props = {
  albumDetails: AlbumDetailsType;
};

const Details = (props: Props) => {
  const {albumDetails} = props;

  const {image, artist} = albumDetails;

  const {width} = useWindowDimensions();

  const navigation = useNavigation() as any;

  const imagePath = getImageBySize(image, ['mega', 'extralarge', 'large']);
  const tracks = get(albumDetails, 'tracks.track', []);

  const onPressArtist = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.ARTIST_DETAILS, {
      artistName: albumDetails?.artist,
    });
  }, [albumDetails?.artist, navigation]);

  const RenderListHeader = useCallback(() => {
    return (
      <>
        <ImageSafety
          imagePath={imagePath}
          size={width - 30}
          iconProps={{size: 150}}
        />

        <View style={styles.artistContainer}>
          <Typography.Text1>Artist: </Typography.Text1>

          <Button
            title={artist}
            type="transparent"
            onPress={onPressArtist}
            textProps={{size: 20}}
            containerStyle={styles.button}
          />
        </View>
      </>
    );
  }, [artist, imagePath, onPressArtist, width]);

  const RenderEmptyComponent = useCallback(() => {
    return (
      <Typography.Text2 alignHorizontal="center" color={COLORS.grey}>
        No tracks found...
      </Typography.Text2>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item: TrackType, index: number) => item.name + index}
        renderItem={Track}
        ListHeaderComponent={RenderListHeader}
        ListEmptyComponent={RenderEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },

  artistContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    paddingVertical: 15,
    marginBottom: 15,
  },

  button: {
    maxWidth: '80%',
  },
});

export default Details;
