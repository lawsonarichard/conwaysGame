import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Grid} from '_atoms';
import { Header } from '_atoms';

const PlayerView = () => {
    const [generations, setGenerations] = useState('0')
    return (
        <>
        <View style={styles.container}>
        <Header title={"Conway's Game of Life"}/>
        </View>
        <Grid/>
        <Text>Generation : {generations}</Text>
        </>
    )
}

export default PlayerView;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'purple',
    },
})