import React from 'react';
import {SvgProps} from 'react-native-svg';

import Close from '../../assets/icons/svg/close.svg';
import ArrowBack from '../../assets/icons/svg/arrow-back.svg';
import Logo from '../../assets/icons/svg/logo.svg';

export type IconProps = {
  name: IconNameType;
  size?: number;
} & SvgProps;

export type IconNameType = 'close' | 'logo' | 'arrow-back';

const nameToSvgIcon: Record<IconNameType, React.FC<SvgProps>> = {
  close: Close,
  'arrow-back': ArrowBack,
  logo: Logo,
};

const Icon = (props: IconProps) => {
  const {name, size = 24, ...restProps} = props;

  const SvgIcon = nameToSvgIcon[name];

  if (!SvgIcon) {
    return null;
  }

  return <SvgIcon width={size} height={size} {...restProps} />;
};

export default Icon;
