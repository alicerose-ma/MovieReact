import React from 'react'
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native'

const Loading = () => {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size='large' style />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity: 0.5, alignItems: 'center', justifyContent: 'center',
    },
})
