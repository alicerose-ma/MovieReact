import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Button } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';

const CustomCheckBox = (props) => {
    return (
        <View>
            <CheckBox
                boxType='square'
                value={props.check}
                onValueChange={props.toggleCheckBox}
            />
        </View>
    )
}

export default CustomCheckBox

const styles = StyleSheet.create({

})
