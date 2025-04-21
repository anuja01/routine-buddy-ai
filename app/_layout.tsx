import { Stack } from 'expo-router';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaView, useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '@/theme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'Baloo2-Bold': require('@/assets/fonts/Baloo2-Bold.ttf'),
    'Nunito-Regular': require('@/assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('@/assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-Light': require('@/assets/fonts/Nunito-Light.ttf'),
    'Nunito-ExtraLight': require('@/assets/fonts/Nunito-ExtraLight.ttf'),
    'Nunito-Bold': require('@/assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Black': require('@/assets/fonts/Nunito-Black.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  if (!fontsLoaded) return null;

  return (
    <SafeAreaContainer>
      <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaContainer>
  );
}

const SafeAreaContainer = styled(SafeAreaView)`
    flex: 1;
`;
