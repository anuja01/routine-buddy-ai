import React, { useEffect, useRef } from 'react';
import { useWindowDimensions, View, Animated } from 'react-native';
import { Audio } from 'expo-av';
import styled from 'styled-components/native';
import Reanimated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';

import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { CloseButton } from '@/components/CloseButton';

const backgroundImage = require('@/assets/images/routine.morning.background.png');
const buddyImage = require('@/assets/images/morning-routine-nicko.png');
const arrowIcon = require('@/assets/images/left-arrow.png');
const doneIcon = require('@/assets/images/done-tick.png');
const crossIcon = require('@/assets/images/warning-cross.png');

const RoutineScreen = () => {
    const sound = useRef<Audio.Sound | null>(null);
    const { width, height } = useWindowDimensions();
    const isHorizontal = width > height;
    const isLargeScreen = Math.min(width, height) >= 768;
    const router = useRouter();

    const offsetX = useSharedValue(-1000);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offsetX.value }],
    }));

    const arrowNudge = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        offsetX.value = withTiming(0, {
            duration: 750,
            easing: Easing.out(Easing.exp),
        });
        startNudge();
        playSequence();
        return () => {
            sound.current?.unloadAsync();
        };
    }, []);

    const startNudge = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(arrowNudge, {
                    toValue: 6,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(arrowNudge, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const audioClips = [
        require('@/assets/audio/good-morning.mp3'),
        require('@/assets/audio/lets-do-this-together.mp3'),
    ];

    const delayBetweenClips = 100;

    const playSequence = async () => {
        for (let i = 0; i < audioClips.length; i++) {
            const { sound: loadedSound } = await Audio.Sound.createAsync(audioClips[i]);
            sound.current = loadedSound;
            await loadedSound.playAsync();
            await waitForPlaybackToFinish(loadedSound);
            await loadedSound.unloadAsync();
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
                <ThemedText type="subtitle">Good morning, Shayen!</ThemedText>
            </HeaderContainer>
            <ContentContainer isHorizontal={isHorizontal}>
                <ListContainer>
                    {[
                        {
                            title: 'Brush my teeth',
                            icon: require('@/assets/images/brush-teeth.png'),
                            onPress: () => router.push('/task'),
                            status: 'skipped',
                            disabled: true,
                        },
                        {
                            title: 'Wash my face',
                            icon: require('@/assets/images/wash-face.png'),
                            status: 'completed',
                            disabled: true,
                        },
                        {
                            title: 'Get dressed',
                            icon: require('@/assets/images/get-dressed.png'),
                            status: 'next',
                        },
                        {
                            title: 'Eat breakfast',
                            icon: require('@/assets/images/eat-breakfast.png'),
                            disabled: true,
                            status: 'queued',
                        },
                        {
                            title: 'Go to preschool',
                            icon: require('@/assets/images/goto-preschool.png'),
                            status: 'queued',
                        },
                    ].map((btn, index) => (
                        <Row key={index}>
                            <ThemedButton
                                fullWidth
                                title={btn.title}
                                icon={btn.icon}
                                onPress={btn.onPress}
                                disabled={btn.disabled}
                            />
                            {
                                btn.status === 'next' ? (
                                    <Animated.View style={{ transform: [{ translateX: arrowNudge }] }}>
                                        <ArrowIcon source={arrowIcon} resizeMode="contain" isLargeScreen={isLargeScreen} />
                                    </Animated.View>
                                ) : btn.status === 'completed' ? (
                                    <ArrowIcon source={doneIcon} resizeMode="contain" isLargeScreen={isLargeScreen} />
                                ) : btn.status === 'skipped' ? (<ArrowIcon source={crossIcon} resizeMode="contain" isLargeScreen={isLargeScreen} />) : (
                                    <ArrowSpacer isLargeScreen={isLargeScreen} />
                                )
                            }
                        </Row>
                    ))}
                </ListContainer>

                <BuddyContainer isHorizontal={isHorizontal}>
                    <AnimatedBuddy
                        source={buddyImage}
                        resizeMode="contain"
                        size={isLargeScreen ? 400 : 200}
                        style={animatedStyle}
                    />
                </BuddyContainer>

                <FinishButtonWrapper>
                    <ThemedButton type="secondary" title={'Finish'} />
                </FinishButtonWrapper>
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

const ArrowSpacer = styled.View<{ isLargeScreen: boolean }>`
  width: ${({ isLargeScreen }) => isLargeScreen ? '80px' : '40px'};
  height:${({ isLargeScreen }) => isLargeScreen ? '80px' : '40px'};
  margin-left: 12px;
`;

const BuddyContainer = styled.View<{ isHorizontal: boolean }>`
  ${({ isHorizontal }) =>
        isHorizontal
            ? `
    flex: 1;
    justify-content: flex-end;
    align-items: center;
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

const AnimatedBuddy = Reanimated.createAnimatedComponent(BuddyImage);

const ArrowIcon = styled.Image<{ isLargeScreen: boolean }>`
  width: ${({ isLargeScreen }) => isLargeScreen ? '80px' : '40px'};
  height: ${({ isLargeScreen }) => isLargeScreen ? '80px' : '40px'};
  margin-left: 12px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const FinishButtonWrapper = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export default RoutineScreen;
