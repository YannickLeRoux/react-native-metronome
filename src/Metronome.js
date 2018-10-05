import React, { Component } from 'react'
import { Text, View, Slider, Button } from 'react-native';


export default class Metronome extends Component {
  state = {
    bpm: 100,
    playing: false,
    count: 0,
    beatPerMeasure: 4
  }

  // https://docs.expo.io/versions/v28.0.0/sdk/audio#__next
  // https://github.com/expo/playlist-example/blob/master/App.js
  // https://daveceddia.com/react-practice-projects/

  async onButtonPress() {
    this.setState({ playing: !this.state.playing });

    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/click1.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }

  }

  render() {
    const { bpm, playing } = this.state;

    return (
      <View style={styles.container}>
        <Text>{bpm}</Text>
        <Slider
          style={styles.slider}
          maximumValue={180}
          minimumValue={60}
          onValueChange={ bpm => this.setState({bpm})}
          step={1}
          value={bpm}
        />
        <Button
        onPress={this.onButtonPress.bind(this)}
        title={ playing ? "Stop" : "Play"}
        accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyItems: 'spaceAround',
    alignItems: 'center'
  },
  slider : {
    height: 3,
    width: 300
  }
}