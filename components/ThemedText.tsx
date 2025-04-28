import { Text, TextProps, useWindowDimensions } from 'react-native';
import { useMemo } from 'react';
import { useAppTheme } from '@/theme/ThemeContext';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'semiBold' | 'title' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { width, height } = useWindowDimensions();
  const { colors } = useAppTheme();
  const isTablet = Math.min(width, height) >= 768;
  const scale = isTablet ? 2 : 1;

  const textStyle = useMemo(() => {
    const baseStyles = {
      default: {
        fontFamily: 'Nunito-Regular',
        fontSize: 20 * scale,
        lineHeight: 28 * scale,
        color: colors.primary,
      },
      semiBold: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 20 * scale,
        lineHeight: 28 * scale,
        color: colors.primary
      },
      title: {
        fontFamily: 'Baloo2-Bold',
        fontSize: 32 * scale,
        lineHeight: 40 * scale,
        color: colors.primary
      },
      subtitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 24 * scale,
        lineHeight: 32 * scale,
        color: colors.primary
      },
      link: {
        fontFamily: 'Nunito-Regular',
        fontSize: 20 * scale,
        lineHeight: 28 * scale,
        color: colors.primary
      },
    };

    return baseStyles[type] || baseStyles.default;
  }, [scale, type]);

  return (
    <Text style={[textStyle, style]} {...rest} />
  );
}
