import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { Audio } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { BackButton } from '@/components/BackButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedButton } from '@/components/ThemedButton';
import { CloseButton } from '@/components/CloseButton';

const backgroundImage = require('@/assets/images/routine.morning.background.png');
const buddyBrushImage = require('@/assets/images/nicko-brush-teeth.png');

// Example list of things buddy might say
const voiceClips = [
    require('@/assets/audio/brush_teeth_together.mp3'),
    require('@/assets/audio/its-so-refreshing.mp3'),
    require('@/assets/audio/brushing-teeth-is-so-much-fun.mp3'),
];

const TaskScreen = () => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768;
    const sound = useRef<Audio.Sound | null>(null);
    const router = useRouter();


    const { task = "brushing my teeth" } = useLocalSearchParams(); // comes from routine list

    useEffect(() => {
        playRandomAudio()
        return () => {
            sound.current?.unloadAsync();
        };
    }, []);

    const playRandomAudio = async () => {
        try {
            const randomIndex = Math.floor(Math.random() * voiceClips.length);
            const { sound: newSound } = await Audio.Sound.createAsync(voiceClips[randomIndex]);
            sound.current = newSound;
            await newSound.playAsync();
        } catch (err) {
            console.error("Failed to play audio:", err);
        }
    };

    return (
        <Background source={backgroundImage} resizeMode="cover">
            <CloseButton />
            <Header>
                <ThemedText type="title">I am {task}</ThemedText>
                <ThemedButton type='primary' title='I am done' onPress={() => router.back()} />
            </Header>

            <BuddyWrapper onPress={playRandomAudio}>
                <BuddyImage
                    source={buddyBrushImage}
                    resizeMode="contain"
                    style={{
                        width: isLargeScreen ? 400 : 248,
                        height: isLargeScreen ? 400 : 248,
                    }}
                />
            </BuddyWrapper>
            <Footer>
                <ThemedButton type='accent' title='Skip' onPress={() => router.back()} />
            </Footer>
        </Background>
    );
};

export default TaskScreen;

const Background = styled.ImageBackground`
    flex: 1;
`;

const Header = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 12px;
    margin-top: 100px;
`;

const BuddyWrapper = styled(TouchableOpacity)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const BuddyImage = styled.Image``;

const Footer = styled.View`
    position: absolute;
    flex-direction: row;
    justify-content: space-between;
    align-items: space-between;
    border: 1px solid #8DAE80;
    bottom: 20px;
    width: 100%;
    padding: 20px;
`;
