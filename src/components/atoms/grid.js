import React, {useState, useCallback, useRef, Platform} from 'react';
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
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
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
      <ReactNativeZoomableView
        style={styles.container}
        maxZoom={1.5}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={0.8}
        bindToBorders={true}>
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
      </ReactNativeZoomableView>
      <View style={{flex: 1, padding: 20, position: 'absolute', bottom: 80}}>
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
            <View stlye={{width: 38, height: 38, backgroundColor: '#2A2A2A'}}>
              <Icon name="stop-circle" size={38} color="#FFFAFB" />
            </View>
          ) : (
            <View>
              <Icon name="play-circle" size={38} color="#FFFAFB" />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setGrid(createEmptyGrid());
            setGenerations(0);
          }}>
          <Icon name="eraser" size={38} color="#FFFAFB" />
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
          <Icon name="random" size={38} color="#FFFAFB" />
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: 550,
  },
});
