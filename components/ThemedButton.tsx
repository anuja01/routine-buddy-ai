import React from 'react';
import { TouchableOpacity, Image, useWindowDimensions, View, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';
import { useAppTheme } from '@/theme/ThemeContext';

export type ThemedButtonProps = {
  type?: 'primary' | 'secondary' | 'accent';
  title: string;
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export function ThemedButton({ type = 'primary', size = 'medium', title, icon, fullWidth = false, disabled, onPress }: ThemedButtonProps) {
  const { colors } = useAppTheme() as ReturnType<typeof useAppTheme> & {
    colors: {
      accent: string;
    };
  };

  const backgroundMap = {
    primary: colors.primary,
    secondary: colors.notification,
    accent: colors.accent,
  };

  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 768;

  const fontSize =
    size === 'small'
      ? isTablet
        ? 30
        : 20
      : size === 'large'
        ? isTablet
          ? 40
          : 28
        : isTablet
          ? 36
          : 24;

  return (
    <TouchableOpacity style={[
      styles.button,
      {
        backgroundColor: disabled ? '#888888' : backgroundMap[type],
        paddingVertical: size === 'small' ? 8 : size === 'large' ? 16 : 12,
        width: fullWidth ? (isTablet ? 440 : 320) : 'auto',
      },
    ] as ViewStyle[]} onPress={onPress} disabled={disabled}>
      {icon && (
        <View style={styles.iconWrapper}>
          <Image src={icon} style={{ width: fontSize * 2, height: fontSize * 2 }} resizeMode="contain" />
        </View>
      )}
      <View style={styles.textWrapper}>
        <ThemedText type="title" style={[styles.buttonLabel, { fontSize }]}>
          {title}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    borderRadius: 20,
    marginVertical: 8,
    alignSelf: 'center',
  },
  iconWrapper: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#F4F1ED',
    fontWeight: '500',
    fontFamily: 'Baloo2-Bold',
  },
});
