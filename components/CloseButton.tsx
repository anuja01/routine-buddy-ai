import React from 'react';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const CloseButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #DDD4C4;
  padding: 12px;
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
  z-index: 10;
`;

const BackLabel = styled.Text`
  color: #F4F1ED;
  font-size: 16px;
  margin-left: 6px;
  font-weight: 500;
`;

export const CloseButton = ({ label = "" }: { label?: string }) => {
  const router = useRouter();

  return (
    <CloseButtonContainer onPress={() => router.back()}>
      <Ionicons name="close" size={24} color="#F4F1ED" />
      {!!label && <BackLabel>{label}</BackLabel>}
    </CloseButtonContainer>
  );
};
