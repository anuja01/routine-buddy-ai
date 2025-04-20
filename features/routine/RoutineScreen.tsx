import React, { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { Audio } from 'expo-av';
import styled from 'styled-components/native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS,
} from 'react-native-reanimated';


import { BackButton } from '@/components/BackButton';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { CloseButton } from '@/components/CloseButton';


const backgroundImage = require('@/assets/images/routine.morning.background.png');
const buddyImage = require('@/assets/images/morning-routine-nicko.png');

const RoutineScreen = () => {
    const sound = useRef<Audio.Sound | null>(null);
    const { width, height } = useWindowDimensions();
    const isHorizontal = width > height; // tablet landscape or web
    const isLargeScreen = width >= 768;
    const router = useRouter();

    const offsetX = useSharedValue(-1000); // start way off-screen

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offsetX.value }],
    }));

    useEffect(() => {
        offsetX.value = withTiming(0, {
            duration: 750,
            easing: Easing.out(Easing.exp),
        });
        playSequence()
        return () => {
            sound.current?.unloadAsync();
        };
    }, []);

    const audioClips = [
        require('@/assets/audio/good-morning.mp3'),
        require('@/assets/audio/lets-do-this-together.mp3')
    ];

    const delayBetweenClips = 100;

    const playSequence = async () => {
        for (let i = 0; i < audioClips.length; i++) {
            const { sound: loadedSound } = await Audio.Sound.createAsync(audioClips[i]);
            sound.current = loadedSound;

            await loadedSound.playAsync();
            await waitForPlaybackToFinish(loadedSound);

            await loadedSound.unloadAsync();

            // Optional delay between clips
            if (i < audioClips.length - 1) {
                await delay(delayBetweenClips);
            }
        }
    };

    const waitForPlaybackToFinish = (sound: Audio.Sound) => {
        return new Promise<void>((resolve) => {
            const checkStatus = async () => {
                const status = await sound.getStatusAsync();
                if (status.isLoaded && !status.isPlaying) {
                    resolve();
                } else {
                    setTimeout(checkStatus, 200);
                }
            };
            checkStatus();
        });
    };

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    return (
        <Background source={backgroundImage} resizeMode="cover">
            <HeaderContainer>
                <CloseButton />
                <ThemedText>Lovely morning</ThemedText>
            </HeaderContainer>
            <ContentContainer isHorizontal={isHorizontal}>
                <ListContainer>
                    <ThemedButton fullWidth onPress={() => router.push('/task')} title={'Brush my teeth'} icon={require('@/assets/images/brush-teeth.png')} />
                    <ThemedButton fullWidth title={'Wash my face'} icon={require('@/assets/images/wash-face.png')} />
                    <ThemedButton fullWidth title={'Get dressed'} icon={require('@/assets/images/get-dressed.png')} />
                    <ThemedButton fullWidth title={'Eat breakfast'} icon={require('@/assets/images/eat-breakfast.png')} />
                    <ThemedButton fullWidth title={'Go to preschool'} icon={require('@/assets/images/goto-preschool.png')} />
                </ListContainer>
                <BuddyContainer isHorizontal={isHorizontal}>
                    <AnimatedBuddy
                        source={buddyImage}
                        resizeMode="contain"
                        size={isLargeScreen ? 400 : 200}
                        style={animatedStyle}
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

const AnimatedBuddy = Animated.createAnimatedComponent(BuddyImage);

export default RoutineScreen;