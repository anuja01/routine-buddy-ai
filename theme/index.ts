import RoutineBuddyPalette from './colors';

const defaultFonts = {
  regular: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '400' as const,
  },
  medium: {
    fontFamily: 'Nunito-SemiBold',
    fontWeight: '500' as const,
  },
  light: {
    fontFamily: 'Nunito-Light',
    fontWeight: '300' as const,
  },
  thin: {
    fontFamily: 'Nunito-ExtraLight',
    fontWeight: '200' as const,
  },
  bold: {
    fontFamily: 'Nunito-Bold',
    fontWeight: '700' as const,
  },
  heavy: {
    fontFamily: 'Nunito-Black',
    fontWeight: '900' as const,
  },
};

export const lightTheme = {
  dark: false,
  colors: RoutineBuddyPalette.light,
  fonts: defaultFonts,
};

export const darkTheme = {
  dark: true,
  colors: RoutineBuddyPalette.dark,
  fonts: defaultFonts,
};