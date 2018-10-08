import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Metronome from './src/Metronome';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Metronome/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
