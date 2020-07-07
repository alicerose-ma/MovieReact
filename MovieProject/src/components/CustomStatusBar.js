import React, {memo} from 'react';
import { View, StatusBar, StyleSheet} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const CustomStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  }
});

export default memo(CustomStatusBar);
