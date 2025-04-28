import React from 'react';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const IconButton = ({ label = "", icon = "checkmark-done", onIconClick }: { label?: string, icon?: React.ComponentProps<typeof Ionicons>['name'], onIconClick?: () => void }) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.back()}>
      <Ionicons name={icon} size={24} color="#F4F1ED" />
      {!!label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8DAE80',
    padding: 12,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  label: {
    color: '#F4F1ED',
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '500',
  },
});