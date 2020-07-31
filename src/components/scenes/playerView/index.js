import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Grid} from '_atoms';

const PlayerView = () => {
  return (
    <>
      <Grid />
    </>
  );
};

export default PlayerView;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'purple',
  },
});
