import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InfoModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <ScrollView contentContainerStyle={styles.modalView}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#FFFAFB'}}>
              Learn the Rules
            </Text>
            <Text style={styles.modalText}>
              The universe of the Game of Life is an infinite, two-dimensional
              orthogonal grid of square cells, each of which is in one of two
              possible states, live or dead, (or populated and unpopulated,
              respectively). Every cell interacts with its eight neighbours,
              which are the cells that are horizontally, vertically, or
              diagonally adjacent. At each step in time, the following
              transitions occur:
            </Text>
            <Text style={styles.modalText}>
              1. Any live cell with fewer than two live neighbours dies, as if
              by underpopulation.
            </Text>
            <Text style={styles.modalText}>
              2. Any live cell with two or three live neighbours lives on to the
              next generation.
            </Text>
            <Text style={styles.modalText}>
              3. Any live cell with more than three live neighbours dies, as if
              by overpopulation.
            </Text>
            <Text style={styles.modalText}>
              4. Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction.
            </Text>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#121212'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </ScrollView>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{width: 24}}>
            <Icon name="info-circle" size={24} color="#FFFAFB" />
          </View>
          <Text style={styles.textStyle}>Learn the rules.</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#2A2A2A',
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    color: 'white',
    fontSize: 16,
  },
});

export default InfoModal;
