import React, {useState, useCallback, useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
} from 'react-native';
import produce from 'immer';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Icon from 'react-native-vector-icons/Ionicons';
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
  const runningRef = useRef();
  runningRef.current = running;
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
        setGenerations(generations => (generations += 1));
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
    setTimeout(runSimulation, 100);
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}>
        {running ? (
          <View>
              <Text>Stop</Text>
          </View>
        ) : (
          <View>
              <Text>Start</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setGrid(createEmptyGrid());
        }}>
       <Text>Clear</Text>
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
        <Text>
          Generate Random
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          colorChanger();
        }}>
        <Text>Color Change</Text>
        <View style={{width: 20, height: 20, backgroundColor: `${color}`}} />
      </TouchableOpacity>
      <ReactNativeZoomableView
        style={styles.container}
        maxZoom={1.5}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={1}
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
      <Text>Generation : {generations}</Text>
    </>
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
    justifyContent: 'space-between',
    width: 550,
    height: 550,
  },
});
