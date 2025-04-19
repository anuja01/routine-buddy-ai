import { Text, TextProps, useWindowDimensions } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'semiBold' | 'title' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { width, height } = useWindowDimensions();
  const {colors } = useTheme();
  const isTablet = Math.min(width, height) >= 768;
  const scale = isTablet ? 2 : 1;

  const textStyle = useMemo(() => {
    const baseStyles = {
      default: {
        fontFamily: 'Nunito-Regular',
        fontSize: 20 * scale,
        lineHeight: 28 * scale,
        color: colors.text,
      },
      semiBold: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 20 * scale,
        lineHeight: 28 * scale,
        color: colors.text
      },
      title: {
        fontFamily: 'Baloo2-Bold',
        fontSize: 32 * scale,
        lineHeight: 40 * scale,
        color: colors.text
      },
      subtitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 24 * scale,
        lineHeight: 32 * scale,
        color: colors.text
      },
      link: {
        fontFamily: 'Nunito-Regular',
        fontSize: 20 * scale,
        lineHeight: 28 * scale,
        color: colors.text
      },
    };

    return baseStyles[type] || baseStyles.default;
  }, [scale, type]);

  return (
    <Text style={[textStyle, style]} {...rest} />
  );
}
