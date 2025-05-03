import React from 'react';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '@/theme/ThemeContext';
import { CustomTheme } from '@/theme/types';
import { ThemedText } from './ThemedText';

export const CloseButton = ({ label = "" }: { label?: string }) => {
  const router = useRouter();
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.back()}
    >
      <Ionicons name="close" size={24} color={theme.colors.background} />
      {!!label && <ThemedText type='title'>{label}</ThemedText>}
    </TouchableOpacity>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: 20,
      right: 20,
      padding: 12,
      borderRadius: theme.borderRadius.small,
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 10,
      backgroundColor: theme.colors.card,
    },
  });
