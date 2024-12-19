import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from '../Icon';
import Typography, {TypographyProps} from '../Typograhy';
import useThemeColor from '../../hooks/useThemeColor';
import {useNavigation} from '@react-navigation/native';
import {isFunction} from 'lodash';

type Props = {
  title: string;
  titleProps?: TypographyProps;
  onGoBack?: AnyFunction;
  withBackButton?: boolean;
  maxLengthTitle?: number;
};

const Header = (props: Props) => {
  const {
    title,
    titleProps,
    onGoBack,
    withBackButton = true,
    maxLengthTitle = 25,
  } = props;

  const navigation = useNavigation() as any;

  const onGoBackPressed = () => {
    if (isFunction(onGoBack)) {
      onGoBack();
      return;
    }

    navigation.goBack();
  };

  const titleCut = useMemo(() => {
    if (title?.length <= maxLengthTitle) {
      return title;
    }

    return title.slice(0, maxLengthTitle + 1) + '...';
  }, [maxLengthTitle, title]);

  const mainColor = useThemeColor('main');
  return (
    <View style={styles.container}>
      {withBackButton && (
        <TouchableOpacity
          onPress={onGoBackPressed}
          style={styles.backButton}
          activeOpacity={0.6}
          hitSlop={{left: 10, top: 15, right: 20, bottom: 15}}>
          <Icon name="arrow-back" />
        </TouchableOpacity>
      )}

      <Typography.Header2
        alignHorizontal="center"
        color={mainColor}
        {...titleProps}>
        {titleCut}
      </Typography.Header2>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 3,
    elevation: 3,
  },
});

export default Header;
