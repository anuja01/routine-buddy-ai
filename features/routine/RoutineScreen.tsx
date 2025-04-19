import React, { useEffect, useRef } from 'react';
import { useWindowDimensions, Text } from 'react-native';
import { Audio } from 'expo-av';
import styled from 'styled-components/native';

import { BackButton } from '@/components/BackButton';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';


const backgroundImage = require('@/assets/images/routine.morning.background.png');
const buddyImage = require('@/assets/images/morning-routine-nicko.png');

const RoutineScreen = () => {
    const sound = useRef<Audio.Sound | null>(null);
    const { width, height } = useWindowDimensions();
    const isHorizontal = width > height; // tablet landscape or web
    const isLargeScreen = width >= 768;

    useEffect(() => {
        playVoice();

        return () => {
            sound.current?.unloadAsync();
        };
    }, []);

    const playVoice = async () => {
        try {
            const { sound: loadedSound } = await Audio.Sound.createAsync(
                require('@/assets/audio/good-morning.mp3')
            );
            sound.current = loadedSound;
            await loadedSound.playAsync();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    return (
        <Background source={backgroundImage} resizeMode="cover">
            <HeaderContainer>
                <BackButton />
                <ThemedText>Lovely morning</ThemedText>
            </HeaderContainer>
            <ContentContainer isHorizontal={isHorizontal}>
                <ListContainer>
                    <ThemedButton title={'Brush my teeth'} icon={require('@/assets/images/brush-teeth.png')} />
                    <ThemedButton title={'Wash my face'} icon={require('@/assets/images/wash-face.png')} />
                    <ThemedButton title={'Get dressed'} icon={require('@/assets/images/get-dressed.png')} />
                    <ThemedButton title={'Eat breakfast'} icon={require('@/assets/images/eat-breakfast.png')} />
                    <ThemedButton title={'Go to preschool'} icon={require('@/assets/images/goto-preschool.png')} />
                </ListContainer>
                <BuddyContainer isHorizontal={isHorizontal}>
                    <BuddyImage
                        source={buddyImage}
                        resizeMode="contain"
                        size={isLargeScreen ? 400 : 200}
                    />
                </BuddyContainer>

            </ContentContainer>
        </Background>
    );
};


const Background = styled.ImageBackground`
    flex: 1;
`;
const HeaderContainer = styled.View`
    flex: 1;
    max-height: 100px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const ContentContainer = styled.View<{ isHorizontal: boolean }>`
    flex: 1;
    flex-direction: ${({ isHorizontal }) => (isHorizontal ? 'row' : 'column-reverse')};
    justify-content: ${({ isHorizontal }) => (isHorizontal ? 'center' : 'flex-end')};
    align-items: center;
    padding: 20px;
`;

const ListContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

const BuddyContainer = styled.View<{ isHorizontal: boolean }>`
    ${({ isHorizontal }) =>
        isHorizontal
            ? `
        flex: 1;
        justify-content: flex-end;
        align-items: flex-end;
        margin-top: 80px;
        `
            : `
        position: absolute;
        bottom: 20px;
        align-self: center;
    `}
`;

const BuddyImage = styled.Image<{ size: number }>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
`;

export default RoutineScreen;