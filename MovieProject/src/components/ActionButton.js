import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const ActionButton = (props) => {
    return (
        <View>
            <View style={{ marginHorizontal: 10 }}>
            <View style={styles.circleIcon}>
                <FontAwesome5Icon
                    name={props.name}
                    color={props.color}
                    solid
                    style={styles.imageStyle}
                    onPress={props.markMovie}
                />
            </View>
        </View>
            <Text style={{textAlign: 'center', justifyContent: 'center', flex: 1, alignItems: 'center', fontSize: 12, marginTop: 5}}>{props.placeholder}</Text>
        </View>
        

    )
}

export default ActionButton

const styles = StyleSheet.create({
    circleIcon: {
        backgroundColor: '#0a094f',
        borderRadius: 150,
    },

    imageStyle: {
        fontSize: 13,
        padding: 15
    }
})
