import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const numRows = 50;
const numCols = 50;

const Grid = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });
  const onPressHandler = () => {
    console.log('Pressed!')
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <TouchableOpacity
            key={`${i}-${k}`}
            style={styles.box}
            onPress={onPressHandler}
          />
        )),
      )}
    </ScrollView>
  );
};

export default Grid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  box: {
    width: 25,
    height: 25,
    margin: 1,
    aspectRatio: 1,
    backgroundColor: 'powderblue',
  },
});
