import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Btn = ({text, colorText, onPress, zero}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={zero ? styles.zeroContainer : styles.container}>
      <Text style={colorText ? styles.textLight : styles.textDark}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderColor: '#19153E',
  },
  zeroContainer: {
    flex: 1.5, // Adjusted flex to 1.5 for the zero button
    alignItems: 'flex-start', // Align text to the left for better appearance
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderColor: '#19153E',
    paddingLeft: 20, // Added padding for left alignment
  },
  textLight: {
    fontSize: 34,
    color: '#fff',
  },
  textDark: {
    fontSize: 34,
    color: '#575757',
  },
});

export default Btn;
