import styled from 'styled-components/native';
import { TouchableOpacity, Image } from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '@react-navigation/native';
import React from 'react';

export type ThemedButtonProps = {
  type?: 'primary' | 'secondary' | 'accent';
  title: string;
  size?: 'small' | 'medium' | 'large';
  icon?: any; // require() image or URI
  onPress?: () => void;
};

const StyledButton = styled(TouchableOpacity)<{ background: string; size: 'small' | 'medium' | 'large' ; isTablet: boolean }>`
  width: 100%;
  max-width: ${(props) => (props.isTablet ? '480px' : '360px')};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: ${(props) => (props.size === 'small' ? '10px' : props.size === 'large' ? '22px' : '18px')};
  padding-horizontal: 16px;
  border-radius: 16px;
  margin-vertical: 12px;
  background-color: ${(props) => props.background};
  align-self: center;
`;

import { useWindowDimensions } from 'react-native';

const ButtonLabel = styled(ThemedText)<{ fontSize: number }>`
  color: #fff;
  font-size: ${(props) => props.fontSize}px;
  margin-left: 12px;
`;

export function ThemedButton({ type = 'primary', size = 'medium', title, icon, onPress }: ThemedButtonProps) {
  const { colors } = useTheme() as ReturnType<typeof useTheme> & {
    colors: {
      accent: string;
    };
  };

  const backgroundMap = {
    primary: colors.primary,
    secondary: colors.card,
    accent: colors.accent,
  };

  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 768;
  const fontSize = size === 'small' ? (isTablet ? 30 : 16) : size === 'large' ? (isTablet ? 40 : 24) : (isTablet ? 36 : 20);

  return (
    <StyledButton background={backgroundMap[type]} size={size} onPress={onPress} isTablet={isTablet}>
      {icon && <Image source={icon} style={{ width: fontSize * 2, height: fontSize * 2 }} resizeMode="contain" />}
      <ButtonLabel type="title" fontSize={fontSize}>{title}</ButtonLabel>
    </StyledButton>
  );
}