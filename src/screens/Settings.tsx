import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth'; // Make sure you have Firebase Auth installed
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {SafeAreaView} from 'react-native-safe-area-context';

const Settings: React.FC = () => {
  // Get the current user
  const user = auth().currentUser;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Function to handle logout
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => navigation.replace('Login'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Settings Screen</Text>

      <Text style={styles.email}>Email: {user?.email}</Text>

      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 24,
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    marginBottom: 40,
  },
});
