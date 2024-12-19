import React from 'react';
import {type ImageProps, View, Image, StyleSheet} from 'react-native';
import Icon, {type IconProps} from '../Icon';

type Props = {
  imagePath?: string;
  width?: number;
  height?: number;
  size?: number;
  imageProps?: ImageProps;
  iconProps?: Partial<IconProps>;
};

const ImageSafety = (props: Props) => {
  const {imagePath, width, height, size = 70, iconProps, imageProps} = props;

  const imageSize =
    width && height ? {width, height} : {width: size, height: size};

  const {style: imageStyle, ...restImageProps} = imageProps || {};
  const {size: iconManualSize, ...restIconProps} = iconProps || {};

  const iconSize = iconManualSize ? iconManualSize : imageSize.width * 0.65;

  return (
    <>
      {imagePath ? (
        <Image
          source={{uri: imagePath}}
          style={[imageSize, imageStyle]}
          {...restImageProps}
        />
      ) : (
        <View style={[styles.iconContainer, imageSize]}>
          <Icon name="logo" size={iconSize} {...restIconProps} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImageSafety;
