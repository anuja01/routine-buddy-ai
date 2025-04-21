import React from 'react';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const IconContainer = styled.TouchableOpacity`
  background-color: #8DAE80;
  padding: 12px;
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
  z-index: 10;
`;

const IconLabel = styled.Text`
  color: #F4F1ED;
  font-size: 16px;
  margin-left: 6px;
  font-weight: 500;
`;

export const IconButton = ({ label = "", icon = "checkmark-done", onIconClick }: { label?: string, icon?: React.ComponentProps<typeof Ionicons>['name'] }) => {
  const router = useRouter();
  return (
    <IconContainer onPress={() => router.back()}>
      <Ionicons name={icon} size={24} color="#F4F1ED" />
      {!!label && <IconLabel>{label}</IconLabel>}
    </IconContainer>
  );
};
