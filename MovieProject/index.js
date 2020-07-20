/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true;
import main from './main';
import redux from './redux'

AppRegistry.registerComponent(appName, () => redux);
