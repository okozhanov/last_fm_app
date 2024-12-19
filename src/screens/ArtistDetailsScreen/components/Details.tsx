import React from 'react';
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import type {
  ArtistDetailsType,
  ArtistShortType,
} from '../../../redux/reducers/artists/reducer';
import {getImageBySize} from '../../../utils/getters';
import ImageSafety from '../../../components/ImageSafety';
import Typography from '../../../components/Typograhy';
import {isEmpty} from 'lodash';
import ArtistCard from './ArtistCard';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import SCREEN_NAMES from '../../../constants/screenNames';
import {removeHtmlTags} from '../../../utils/string';

type Props = {
  artistDetails: ArtistDetailsType;
};

const Details = (props: Props) => {
  const {artistDetails} = props;
  const {
    name,
    image,
    bio: {content},
    similar: {artist: similarArtists},
  } = artistDetails;

  const {width} = useWindowDimensions();

  const navigation = useNavigation() as any;

  const imagePath = getImageBySize(image, ['mega', 'extralarge', 'large']);

  const onPressAlbums = () => {
    navigation.reset({
      index: 1,
      routes: [
        {name: SCREEN_NAMES.WELCOME},
        {name: SCREEN_NAMES.HOME, params: {artistName: name}},
      ],
    });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <ImageSafety
        imagePath={imagePath}
        size={width - 30}
        iconProps={{size: 150}}
      />

      <Button
        title="View albums"
        onPress={onPressAlbums}
        containerStyle={styles.buttonContainer}
      />

      <Typography.Text2>{removeHtmlTags(content)}</Typography.Text2>

      {!isEmpty(similarArtists) && similarArtists && (
        <View>
          <Typography.Text1 style={styles.similarArtistsTitle}>
            Similar artists:
          </Typography.Text1>

          {similarArtists.map((item: ArtistShortType, index: number) => {
            return <ArtistCard artist={item} key={item?.name + index} />;
          })}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },

  buttonContainer: {
    marginVertical: 15,
  },

  similarArtistsTitle: {
    marginVertical: 15,
  },
});

export default Details;
