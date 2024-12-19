import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {TrackType} from '../../../redux/reducers/albums/reducer';
import {secondsToTime} from '../../../utils/time';
import Typography from '../../../components/Typograhy';

type Props = {
  item: TrackType;
  index: number;
};

const Track = (props: Props) => {
  const {
    item: {name, duration},
    index,
  } = props;
  return (
    <View style={styles.container}>
      <Typography.Text1 weight="semiBold" style={styles.name}>{`${
        index + 1
      }. ${name}`}</Typography.Text1>

      <Typography.Caption1>{secondsToTime(duration)}</Typography.Caption1>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  name: {
    maxWidth: '80%',
  },
});

export default Track;
