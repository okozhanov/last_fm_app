import React from 'react';
import {View, ViewProps} from 'react-native';
import useThemeColor from '../../hooks/useThemeColor';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ThemedViewProps = ThemeProps & ViewProps;

const ThemedView = (props: ThemedViewProps) => {
  const {style, lightColor, darkColor, ...restProps} = props;
  const backgroundColor = useThemeColor('background', {
    light: lightColor,
    dark: darkColor,
  });

  return <View style={[{backgroundColor}, style]} {...restProps} />;
};

export default ThemedView;
