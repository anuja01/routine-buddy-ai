import React from 'react';
import { TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { ThemedText } from './ThemedText';
import { useTheme } from '@react-navigation/native';

export type ThemedButtonProps = {
  type?: 'primary' | 'secondary' | 'accent';
  title: string;
  size?: 'small' | 'medium' | 'large';
  icon?: any; // require() image or URI
  fullWidth?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

const StyledButton = styled(TouchableOpacity) <{ background: string; size: 'small' | 'medium' | 'large'; isTablet: boolean; fullWidth?: boolean }>`
  width: ${(props) => (props.fullWidth ? (props.isTablet ? '440px' : '320px') : 'wrap-content')};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-vertical: ${(props) =>
    props.size === 'small' ? '8px' : props.size === 'large' ? '16px' : '12px'};
  padding-horizontal: 24px;
  border-radius: 20px;
  margin-vertical: 8px;
  background-color: ${(props) => props.background};
  align-self: center;
`;

const IconWrapper = styled.View`
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const ButtonLabel = styled(ThemedText) <{ fontSize: number }>`
  color: #F4F1ED;
  font-size: ${(props) => props.fontSize}px;
  font-weight: 500;
  font-family: Baloo2-Bold;
`;

export function ThemedButton({ type = 'primary', size = 'medium', title, icon, fullWidth = false, onPress }: ThemedButtonProps) {
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
    <StyledButton background={backgroundMap[type]} size={size} onPress={onPress} isTablet={isTablet} fullWidth={fullWidth}>
      {icon && (
        <IconWrapper>
          <Image source={icon} style={{ width: fontSize * 2, height: fontSize * 2 }} resizeMode="contain" />
        </IconWrapper>
      )}
      <TextWrapper>
        <ButtonLabel type="title" fontSize={fontSize}>
          {title}
        </ButtonLabel>
      </TextWrapper>
    </StyledButton>
  );
}
