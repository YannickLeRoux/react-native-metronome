import React, { Component } from 'react'
import { Text, View, Slider, Button } from 'react-native';

import click1 from '../assets/click1.wav';
import click2 from '../assets/click2.wav';

export default class Metronome extends Component {
  constructor(props) {
    super(props)

    state = {
      bpm: 100,
      playing: false,
      count: 0,
      beatPerMeasure: 4
    }
// https://docs.expo.io/versions/v28.0.0/sdk/audio#__next
//https://github.com/expo/playlist-example/blob/master/App.js
    this.click1 = new Expo.Audio(click1);
    this.click2 = new Expo.Audio(click2);
  }

  onButtonPress() {
    this.setState({ playing: !this.state.playing })

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
    justifyItems: 'space around',
    alignItems: 'center'
  },
  slider : {
    height: 3,
    width: 300
  }
}