import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const Home = () => {

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Our Routine" />
        <Card.Content>
          <Text>Home page</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  input: {
    marginBottom: 16,
  },
  greetingText: {
    marginTop: 20,
    fontSize: 20,
  },
});

export default Home;
