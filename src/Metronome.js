import React, { Component } from 'react'
import { Text, View, Slider, Button } from 'react-native';


export default class Metronome extends Component {

  constructor(props) {
    super(props);
    this.click1=null;
    this.click2=null;
  }

  state = {
    bpm: 100,
    playing: false,
    count: 0,
    beatPerMeasure: 4
  }

  async componentWillMount() {
    this.click1 = await Expo.Audio.Sound.create(require('../assets/click1.mp3'));
    this.click2 = await Expo.Audio.Sound.create(require('../assets/click2.mp3'));
    }


    // https://docs.expo.io/versions/v28.0.0/sdk/audio#__next
    // https://github.com/expo/playlist-example/blob/master/App.js
    // https://daveceddia.com/react-practice-projects/

    startStop = () => {
      if (this.state.playing) {
        // Stop the timer
        clearInterval(this.timer);
        this.setState({
          playing: false
        });
      } else {
        // Start a timer with the current BPM
        this.timer = setInterval(
          this.playClick,
          (60 / this.state.bpm) * 1000
        );
        this.setState(
          {
            count: 0,
            playing: true
            // Play a click "immediately" (after setState finishes)
          },
          this.playClick
        );
      }
    };

    playClick = () => {
      const { count, beatsPerMeasure } = this.state;

      // The first beat will have a different sound than the others
      if (count % beatsPerMeasure === 0) {
        this.click2.sound.replayAsync();
      } else {
        this.click1.sound.replayAsync();
      }

      // Keep track of which beat we're on
      this.setState(state => ({
        count: (state.count + 1) % state.beatsPerMeasure
      }));
    };

    handleBpmChange = bpm => {

      if (this.state.playing) {
        // Stop the old timer and start a new one
        clearInterval(this.timer);
        this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

        // Set the new BPM, and reset the beat counter
        this.setState({
          count: 0,
          bpm
        });
      } else {
        // Otherwise just update the BPM
        this.setState({ bpm });
      }
    };



  render() {
    const { bpm, playing } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.bpmTitle}>{bpm} BPM</Text>
        <Slider
          style={styles.slider}
          maximumValue={180}
          minimumValue={60}
          onValueChange={this.handleBpmChange}
          step={1}
          value={bpm}
        />
        <Button
        style={styles.button}
        onPress={this.startStop}
        title={ playing ? "Stop" : "Play"}
        accessibilityLabel="Start and Stop The Metronome"
        />
      </View>
    )
  }
}

const styles = {
  bpmTitle: {
    fontSize: 30,
    marginBottom: 50
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  slider : {
    height: 3,
    width: 300
  },
  button: {
    fontSize:70
  }
}