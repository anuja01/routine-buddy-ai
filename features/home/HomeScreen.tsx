import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScreen } from '@/components/ThemedScreen';
import { ThemedButton } from '@/components/ThemedButton';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

const backgroundImage = require('@/assets/images/home-screen.png');


export default function HomeScreen() {

    const router = useRouter(); 
    
    return (
        <Background source={backgroundImage} resizeMode="cover">
            <WelcomeSection>
                <ThemedText type="title">Hello, Shayen!</ThemedText>
            </WelcomeSection>
            <ButtonGroup>
                <TouchableOpacity>
                    <ThemedButton
                        title="My Morning"
                        type="primary"
                        size="large"
                        icon={require('@/assets/images/brush-teeth.png')}
                        onPress={() => router.push('/routine')}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <ThemedButton type="secondary" title="Go to settings" size="medium" />
                </TouchableOpacity>
            </ButtonGroup>
        </Background>
    );
}

const WelcomeSection = styled.View`
    margin-top: 48px;
`;

const ButtonGroup = styled.View`
    margin-bottom: 32px;
`;

const Background = styled.ImageBackground`
    flex: 1;
`;