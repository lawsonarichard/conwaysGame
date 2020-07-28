import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {PRIMARY} from '_styles';
import { WHITE } from '_styles';
import { SECONDARY } from '_styles';

const HelloWorld = ({name}) => (
  <View style={styles.container}>
    <Text style={styles.Text}>Hello World {name}!</Text>
  </View>
);

export default HelloWorld;

const styles = StyleSheet.create({
  Text: {
    fontSize: 40,
    color: PRIMARY,
  },
  container: {
    height: 100,
    flex: 1,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
})