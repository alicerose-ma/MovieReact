import React from 'react'
import { StyleSheet, View, Keyboard,  TouchableWithoutFeedback } from 'react-native'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}> {children}
    </TouchableWithoutFeedback>
)

export default DismissKeyboard

const styles = StyleSheet.create({
})
