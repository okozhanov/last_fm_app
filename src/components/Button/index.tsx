import React, {useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import Typography, {type TypographyProps} from '../Typograhy';
import useThemeColor from '../../hooks/useThemeColor';

type Props = {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textProps?: TypographyProps;
  type?: 'solid' | 'transparent';
};

const Button = (props: Props) => {
  const {
    title,
    onPress,
    containerStyle = {},
    textProps,
    type = 'solid',
  } = props;

  const textColor = useThemeColor('background');
  const mainColor = useThemeColor('main');

  const touchableProps: TouchableOpacityProps = {
    activeOpacity: 0.6,
    onPress: onPress,
    hitSlop: {top: 15, right: 10, bottom: 10, left: 15},
  };

  const Text = useMemo(() => {
    return textProps?.size ? Typography.Base : Typography.Text2;
  }, [textProps?.size]);

  if (type === 'transparent') {
    return (
      <TouchableOpacity {...touchableProps} style={containerStyle}>
        <Text
          style={styles.underlineButtonText}
          color={mainColor}
          {...textProps}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      {...touchableProps}
      style={[styles.button, {backgroundColor: mainColor}, containerStyle]}>
      <Text style={{color: textColor}} {...textProps}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  underlineButtonText: {
    textDecorationLine: 'underline',
  },
});

export default Button;
