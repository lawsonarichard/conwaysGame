import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
    return (
        <View>
            <Text style={styles.header}>
                {title}
            </Text>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        fontSize: 36,
    }
})