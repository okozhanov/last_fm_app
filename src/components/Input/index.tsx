import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import useThemeColor from '../../hooks/useThemeColor';
import {COLORS} from '../../constants/colors';
import Icon from '../Icon';
import {noop} from 'lodash';

type Props = {
  onClear?: () => void;
  containerStyle?: ViewStyle;
};

const Input = (props: TextInputProps & Props) => {
  const {style = {}, containerStyle = {}, onClear = noop, ...restProps} = props;

  const placeholderColor = useThemeColor('placeholder');
  const textColor = useThemeColor('text');

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        placeholderTextColor={placeholderColor}
        maxLength={50}
        style={[styles.input, {color: textColor}, style]}
        {...restProps}
      />

      {restProps?.value && (
        <TouchableOpacity
          style={styles.clearButton}
          activeOpacity={0.6}
          onPress={onClear}>
          <Icon name="close" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
  },

  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    padding: 10,
  },

  clearButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default Input;
