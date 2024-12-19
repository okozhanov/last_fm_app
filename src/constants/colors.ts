const COLORS = {
  white: '#fff',
  black: '#000',
  grey: '#A3A3A3',
  mainDarkRed: '#EA544D',
  mainLightRed: '#BD4F4A',
  darkGray: '#434343',
  lightGray: '#F1F1F1',
  placeholderLight: '#7B7B7B',
  placeholderDark: '#C2C2C2',
};

const COLORS_BY_MODE = {
  light: {
    text: COLORS.darkGray,
    background: COLORS.lightGray,
    placeholder: COLORS.placeholderLight,
    main: COLORS.mainLightRed,
  },
  dark: {
    text: COLORS.lightGray,
    background: COLORS.darkGray,
    placeholder: COLORS.placeholderDark,
    main: COLORS.mainDarkRed,
  },
};

export {COLORS_BY_MODE, COLORS};
