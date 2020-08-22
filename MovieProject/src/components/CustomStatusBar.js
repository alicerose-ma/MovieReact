import React, { memo } from 'react';
import { View, StatusBar, StyleSheet, Platform, NativeModules, Text } from 'react-native';
// import { getStatusBarHeight } from 'react-native-status-bar-height';

const CustomStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <StatusBar translucent backgroundColor={backgroundColor} barStyle="dark-content" {...props} />
        </View>
    )
};

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? StatusBarManager.HEIGHT : StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    }
});

export default memo(CustomStatusBar);
