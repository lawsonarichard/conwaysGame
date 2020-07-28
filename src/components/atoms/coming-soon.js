import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const ComingSoon = () => (
  <View style={styles.container}>
    <Text style={styles.Text}>Coming Soon!</Text>
  </View>
);

export default ComingSoon;

const styles = StyleSheet.create({
  Text: {
    fontSize: 40,
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