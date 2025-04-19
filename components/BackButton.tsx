import React from 'react';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 20px;
  background-color: #8DAE80;
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

export const BackButton = ({ label = "" }: { label?: string }) => {
  const router = useRouter();

  return (
    <BackButtonContainer onPress={() => router.back()}>
      <Ionicons name="chevron-back" size={24} color="#F4F1ED" />
      {!!label && <BackLabel>{label}</BackLabel>}
    </BackButtonContainer>
  );
};
