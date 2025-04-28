import { SafeAreaView, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { useAppTheme } from '@/theme/ThemeContext';

type ThemedScreenProps = {
  children: ReactNode;
  style?: object;
};

export function ThemedScreen({ children, style }: ThemedScreenProps) {
  const { colors } = useAppTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
