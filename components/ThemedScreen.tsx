import styled from 'styled-components/native';
import { ReactNode } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';

const ScreenContainer = styled.SafeAreaView<{ bg: string }>`
  flex: 1;
  padding: 24px;
  background-color: ${(props) => props.bg};
`;

type ThemedScreenProps = {
  children: ReactNode;
  style?: object;
};

export function ThemedScreen({ children, style }: ThemedScreenProps) {
  const { colors } = useAppTheme();

  return <ScreenContainer bg={colors.background} style={style}>{children}</ScreenContainer>;
}
