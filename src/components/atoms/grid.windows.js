/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import produce from 'immer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from '_atoms';
import {InfoModal} from '_atoms';

const numRows = 25;
const numCols = 25;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const createEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const Grid = () => {
  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });
  const [generations, setGenerations] = useState(0);
  const [color, setColor] = useState('#00BCD4');
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [multiplier, setMultiplier] = useState('1x');
  const runningRef = useRef();
  runningRef.current = running;

  const speedChanger = () => {
    if (speed === 500) {
      setMultiplier('1.5x');
      console.log(speed);
      setSpeed(1);
    }
    if (speed === 1) {
      setMultiplier('2x');
      setSpeed(0.1);
      console.log(speed);
    } else if (speed === 1 || speed === 0.1) {
      setMultiplier('1x');
      setSpeed(500);
      console.log(speed);
    }
  };
  const colorChanger = () => {
    var ColorCode =
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')';
    setColor(ColorCode);
  };
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, speed);
    setGenerations(generations => (generations += 1));
  }, [speed]);

  return (
    <View style={{flex: 1, backgroundColor: '#121212'}}>
      <View style={styles.container}>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <TouchableOpacity
              key={`${i}-${k}`}
              style={{
                width: 20,
                height: 20,
                margin: 1,
                aspectRatio: 1,
                backgroundColor: grid[i][k] ? `${color}` : 'black',
              }}
              onPress={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                console.log('Pressed');
                setGrid(newGrid);
              }}
            />
          )),
        )}
      </View>
      <View style={{flex: 1, padding: 20, position: 'absolute', bottom: 120}}>
        <Header title="Conway's Game of Life" />
        <Text style={{color: '#FFFAFB', fontSize: 18}}>
          Generation : {generations}
        </Text>
        <InfoModal />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          bottom: 0,
          position: 'absolute',
          backgroundColor: '#2A2A2A',
          width: '100%',
          padding: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}>
          {running ? (
            <View >
              <Text style={styles.Button}>Stop</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.Button}>Start</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setGrid(createEmptyGrid());
            setGenerations(0);
          }}>
          <Text style={styles.Button}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            speedChanger();
          }}>
          <Text style={{color: '#FFFAFB', fontSize: 24}}>{multiplier}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)),
              );
            }
            setGrid(rows);
          }}>
          <Text style={styles.Button}>Random</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            colorChanger();
          }}>
          <View style={{width: 38, height: 38, backgroundColor: `${color}`}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: 550,

  },
  Button: {
    fontSize: 24,
  },
});
