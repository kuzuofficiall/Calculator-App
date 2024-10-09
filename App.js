import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Btn from './components/Button';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

export default class App extends React.Component {
  state = {
    value: null,
    displayValue: '0',
    colorView: true,
    waitingForOperand: false,
    operator: null,
    bts: ' ',
  };

  inputDigit = digit => {
    const {displayValue, waitingForOperand} = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  inputDot = () => {
    const {displayValue, waitingForOperand} = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false,
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false,
      });
    }
  };

  toggleColor = () => {
    this.setState({
      colorView: !this.state.colorView,
    });
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      bts: ' ',
    });
  };

  toggleSign = () => {
    const {displayValue} = this.state;

    this.setState({
      displayValue:
        displayValue.charAt(0) === '-'
          ? displayValue.substr(1)
          : '-' + displayValue,
    });
  };

  inputPercent = () => {
    const {displayValue} = this.state;
    const value = parseFloat(displayValue);
    this.setState({
      displayValue: String(value / 100),
    });
  };

  performOperation = nextOperator => {
    const {displayValue, operator, value} = this.state;

    const nextValue = parseFloat(displayValue);

    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      x: (prevValue, nextValue) => prevValue * nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue,
    };

    if (value == null) {
      this.setState({
        value: nextValue,
      });
    } else if (operator) {
      const currentValue = value || 0;
      const computedValue = operations[operator](currentValue, nextValue);

      this.setState({
        value: computedValue,
        displayValue: String(computedValue),
        bts:
          operator === '=' ? ' ' : `${currentValue} ${operator} ${nextValue}`,
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
  };

  render() {
    const {displayValue} = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('../calculator/assets/helloKity.jpg')}
        />
        <LinearGradient
          colors={
            this.state.colorView
              ? ['#6191FF', '#4439A7']
              : ['#FF9B61', '#D57B9E']
          }
          start={{x: 0.1, y: 0.1}}
          end={{x: 1, y: 1}}>
          <View style={styles.top}>
            <Feather
              name={this.state.colorView ? 'toggle-right' : 'toggle-left'}
              size={32}
              color={this.state.colorView ? '#fff' : '#575757'}
              onPress={this.toggleColor}
              style={{bottom: 90, paddingLeft: 20}}
            />
            <Text
              style={
                this.state.colorView ? styles.numberBTS : styles.numberBTSL
              }>
              {this.state.bts}
            </Text>
            <Text style={styles.number}>{displayValue}</Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={
            this.state.colorView ? ['#37498F', '#19153E'] : ['#fff', '#fff']
          }
          start={{x: 0.1, y: 0.1}}
          end={{x: 1, y: 1}}
          style={styles.bottom}>
          <View style={styles.row}>
            <Btn
              text="AC"
              colorText={this.state.colorView}
              onPress={this.clearDisplay}
            />
            <Btn
              text="±"
              colorText={this.state.colorView}
              onPress={this.toggleSign}
            />
            <Btn
              text="%"
              colorText={this.state.colorView}
              onPress={this.inputPercent}
            />
            <Btn
              text="/"
              colorText={this.state.colorView}
              onPress={() => this.performOperation('/')}
            />
          </View>

          <View style={styles.row}>
            <Btn
              text="7"
              onPress={() => this.inputDigit(7)}
              colorText={this.state.colorView}
            />
            <Btn
              text="8"
              onPress={() => this.inputDigit(8)}
              colorText={this.state.colorView}
            />
            <Btn
              text="9"
              onPress={() => this.inputDigit(9)}
              colorText={this.state.colorView}
            />
            <Btn
              text="x"
              colorText={this.state.colorView}
              onPress={() => this.performOperation('x')}
            />
          </View>
          <View style={styles.row}>
            <Btn
              text="4"
              onPress={() => this.inputDigit(4)}
              colorText={this.state.colorView}
            />
            <Btn
              text="5"
              onPress={() => this.inputDigit(5)}
              colorText={this.state.colorView}
            />
            <Btn
              text="6"
              onPress={() => this.inputDigit(6)}
              colorText={this.state.colorView}
            />
            <Btn
              text="-"
              colorText={this.state.colorView}
              onPress={() => this.performOperation('-')}
            />
          </View>
          <View style={styles.row}>
            <Btn
              text="1"
              onPress={() => this.inputDigit(1)}
              colorText={this.state.colorView}
            />
            <Btn
              text="2"
              onPress={() => this.inputDigit(2)}
              colorText={this.state.colorView}
            />
            <Btn
              text="3"
              onPress={() => this.inputDigit(3)}
              colorText={this.state.colorView}
            />
            <Btn
              text="+"
              colorText={this.state.colorView}
              onPress={() => this.performOperation('+')}
            />
          </View>

          <View style={styles.row}>
            <Btn
              text="0"
              colorText={this.state.colorView}
              onPress={() => this.inputDigit(0)}
              zero
            />
            <Btn
              text="."
              colorText={this.state.colorView}
              onPress={this.inputDot}
            />
            <LinearGradient
              style={styles.button}
              colors={
                this.state.colorView
                  ? ['#6191FF', '#4439A7']
                  : ['#FF9B61', '#D57B9E']
              }
              start={{x: 0.1, y: 0.1}}
              end={{x: 1, y: 1}}>
              <TouchableOpacity onPress={() => this.performOperation('=')}>
                <Text style={{color: '#fff', fontSize: 36}}>{'='}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  number: {
    color: '#fff',
    textAlign: 'right',
    padding: 10,
    fontSize: 36,
  },
  top: {
    paddingTop: 120,
  },
  bottom: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderColor: '#19153E',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBTS: {
    color: '#6191FF',
    textAlign: 'right',
    padding: 10,
    fontSize: 26,
  },
  numberBTSL: {
    color: '#FDFCFC',
    textAlign: 'right',
    padding: 10,
    fontSize: 26,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'center',
  },
});
