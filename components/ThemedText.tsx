import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useAppTheme } from '@/theme/ThemeContext';
import { CustomTheme } from '@/theme/types';

type FontType = keyof CustomTheme['fonts'];

interface ThemedTextProps extends TextProps {
  type?: FontType;
  children: React.ReactNode;
}

export const ThemedText = ({ type = 'body', style, children, ...rest }: ThemedTextProps) => {
  const theme = useAppTheme();
  const font = theme.fonts[type];

  return (
    <Text
      style={[
        {
          color: theme.colors.text,
          fontFamily: font.fontFamily,
          fontWeight: font.fontWeight as TextStyle['fontWeight'],
          fontSize: font.fontSize ?? 14,
          lineHeight: (font.fontSize ?? 14) * 1.4,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
