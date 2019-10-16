import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import BackgroundTimer from 'react-native-background-timer';


/**
 * One page app
 * */
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      totalTime: 300, // 5 minutes
      isRunning: true,
    };

    this.startTimer();
  }

  render() {
    return <View style={styles.container}>

      <View style={styles.titleBar}>
        <Text style={styles.title}>{'倒计时'}</Text>
      </View>

      <View style={styles.contentContainer}>

        {
          this.displayCountDown()
        }

        <TouchableOpacity onPress={() => this.onAddTime(1)}>
          <View style={styles.addTime1}>
            <Text style={styles.addTimeText}>{'+ 1 分钟'}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.onAddTime(5)}>
          <View style={styles.addTime2}>
            <Text style={styles.addTimeText}>{'+ 5 分钟'}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.onActionButtonClick()}>
          <View style={styles.actionButton}>
            <Text style={styles.buttonText}>{this.state.isRunning ? '停 止' : '开 始'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  }

  displayCountDown() {
    let minutes = Math.floor(this.state.totalTime / 60);
    let seconds = this.state.totalTime % 60;

    if (minutes > 0) {
      return <View style={[styles.leftTimeContainer, this.state.isRunning && {backgroundColor: '#67cbf8'}]}>
        <Text style={styles.leftTime}>{minutes}</Text>
        <Text style={styles.leftTime}>{': '}</Text>
        <Text style={styles.leftTime}>{('0' + (seconds).toFixed(0)).slice(-2)}</Text>
      </View>;
    } else {
      return <View style={[styles.leftTimeContainer, this.state.isRunning && {backgroundColor: '#67cbf8'}]}>
        <Text style={styles.leftTime}>{('0' + (seconds).toFixed(0)).slice(-2)}</Text>
      </View>;
    }
  }

  onAddTime(min) {
    this.setState({totalTime: this.state.totalTime + min * 60})
  }

  onActionButtonClick() {
    if (this.lastClickTime && Date.now() < this.lastClickTime + 300) {
      // debuncing
      console.log('App-onActionButtonClick(): click too fast');
      return;
    }


    if (this.state.isRunning) {
      this.resetTimer();
    } else {
      this.startTimer();
    }

    this.setState(state => {
      return {isRunning: !state.isRunning}
    });

    this.lastClickTime = Date.now();
  }

  resetTimer() {
    BackgroundTimer.stopBackgroundTimer();
    this.setState({totalTime: 300});
  }

  startTimer() {
    BackgroundTimer.runBackgroundTimer(() => {
      if (this.state.totalTime <= 0) {
        BackgroundTimer.stopBackgroundTimer();
        this.setState({isRunning: false});

        console.log('App-startTimer(): done');

        // ringing and vibrating

        // send notification
        return;
      }

      this.setState(state => {
        return {totalTime: state.totalTime - 1}
      });
    }, 1000);
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleBar: {
    backgroundColor: 'white',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.6,
    ...Platform.select({
      ios: {
        shadowColor: '#ccc',
        shadowOffset: {width: 10, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      }
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 4,
  },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftTimeContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 100,
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#333',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        shadowRadius: 5,
      },
      android: {
        elevation: 1,
      }
    }),
  },
  leftTime: {
    color: '#456',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },

  addTime1: {
    marginTop: 50,
  },
  addTime2: {
    marginTop: 30,
  },
  addTimeText: {
    color: '#666',
    fontSize: 22,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        fontWeight: '400',
      }
    }),
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
  },

  actionButton: {
    width: 200,
    backgroundColor: 'white',
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  buttonText: {
    color: '#f44336',
    fontSize: 24,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        fontWeight: '400',
      }
    }),
  },
});

export default App;
