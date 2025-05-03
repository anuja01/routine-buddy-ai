import RoutineBuddyPalette from './colors';
import { CustomTheme } from './types';

const fonts = {
  header: { fontFamily: 'Nunito-Black', fontWeight: '700', fontSize: 24, lineHeight: 28 },
  title: { fontFamily: 'Nunito-Bold', fontWeight: '600', fontSize: 20, lineHeight: 24 },
  label: { fontFamily: 'Nunito-SemiBold', fontWeight: '500', fontSize: 16, lineHeight: 20 },
  body: { fontFamily: 'Nunito-Regular', fontWeight: '400', fontSize: 14, lineHeight: 18 },
  caption: { fontFamily: 'System', fontWeight: '300', fontSize: 12, lineHeight: 16 },
};

const spacing = {
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  xxlarge: 20,
};

const borderRadius = {
  small: 32,
  medium: 48,
  large: 60,
};

export const lightTheme: CustomTheme = {
  dark: false,
  colors: RoutineBuddyPalette.light,
  fonts: fonts,
  spacing: spacing,
  borderRadius: borderRadius,
};

export const darkTheme: CustomTheme = {
  dark: true,
  colors: RoutineBuddyPalette.dark,
  fonts: fonts,
  spacing: spacing,
  borderRadius: borderRadius,
};