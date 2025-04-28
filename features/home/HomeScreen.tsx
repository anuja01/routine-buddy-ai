import { TouchableOpacity, StyleSheet, View, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedButton } from '@/components/ThemedButton';
import { useRouter } from 'expo-router';

const backgroundImage = require('@/assets/images/home-screen.png');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
      <View style={styles.welcomeSection}>
        <ThemedText type="title">Hello, Shayen!</ThemedText>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity>
          <ThemedButton
            title="My Morning"
            type="primary"
            size="large"
            icon={require('@/assets/images/brush-teeth.png')}
            onPress={() =>
              router.push({
                pathname: '/routine',
                params: {
                  routineId: 'morning',
                  userName: 'Shayen',
                  steps: JSON.stringify([
                    {
                      title: 'Brush my teeth',
                      icon: 'brush-teeth.png',
                      onPress: () => router.push('/task'),
                  status: 'next',
                    },
                    {
                      title: 'Wash my face',
                      icon: 'wash-face.png',
    
                    },
                    {
                      title: 'Get dressed',
                      icon: 'get-dressed.png',
                    
                    },
                    {
                      title: 'Eat breakfast',
                      icon: 'eat-breakfast.png',
         
                      disabled: false,
                    },
                    {
                      title: 'Go to preschool',
                      icon: 'goto-preschool.png',
                      status: 'queued',
                    },
                  ]),
                },
              })
            }
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <ThemedButton type="secondary" title="Go to settings" size="medium" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  welcomeSection: {
    marginTop: 48,
  },
  buttonGroup: {
    marginBottom: 32,
  },
});
