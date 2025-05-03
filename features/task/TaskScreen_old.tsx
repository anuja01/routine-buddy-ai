// ⚠️ Temporary Reference File — Do Not Use in Production
// Retained for reference only during development — [YourName, 2025-05-03]

import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
// import { useAppTheme } from '@/theme/ThemeContext';

import { ThemedText } from '@/components/ThemedText';
import { ThemedButton } from '@/components/ThemedButton';
import { CloseButton } from '@/components/CloseButton';
import { CircularCountdownTimer } from '@/components/CoundownTimer';

const backgroundImage = require('@/assets/images/routine.morning.background.png');
const buddyBrushImage = require('@/assets/images/nicko-brush-teeth.png');

const voiceClips = [
    require('@/assets/audio/brush_teeth_together.mp3'),
    require('@/assets/audio/its-so-refreshing.mp3'),
    require('@/assets/audio/brushing-teeth-is-so-much-fun.mp3'),
];

const taskComletionAudio = require('@/assets/audio/next-step.mp3');

const TaskScreen = () => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768;
    const sound = useRef<Audio.Sound | null>(null);
    const router = useRouter();

    const { task = 'brushing my teeth' } = useLocalSearchParams();

    useEffect(() => {
        playRandomAudio();
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
            console.error('Failed to play audio:', err);
        }
    };

    const onComplete = async () => {
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(taskComletionAudio);
            sound.current = newSound;
            await newSound.playAsync();
            await newSound.setOnPlaybackStatusUpdate(async (status) => {
                if (status.isLoaded && status.didJustFinish) {
                    await newSound.unloadAsync();
                    router.back();
                }
            });
        } catch (err) {
            console.error('Failed to play completion sound:', err);
        }
    };

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
            <CloseButton />
            <View style={styles.header}>
                <ThemedText type="title">I am {task}</ThemedText>
                <CircularCountdownTimer duration={5} color="#D16E5B" />
                <ThemedButton type="primary" title="Complete" onPress={onComplete} />
            </View>

            <TouchableOpacity style={styles.buddyWrapper} onPress={playRandomAudio}>
                <Image
                    source={buddyBrushImage}
                    resizeMode="contain"
                    style={{
                        width: isLargeScreen ? 400 : 248,
                        height: isLargeScreen ? 400 : 248,
                    }}
                />
            </TouchableOpacity>

            <View style={styles.footer}>
                <ThemedButton type="accent" title="Skip" onPress={() => router.back()} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 12,
        marginTop: 100,
    },
    buddyWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 20,
        width: '100%',
        padding: 20,
    },
});

export default TaskScreen;
