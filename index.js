/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppNavigator from './src/app-navigation/AppNavigator';
import All from './src/app-views/Testing/All';
import AvatarPicker from './src/app-views/UserScreen/components/AvatarUpload';

AppRegistry.registerComponent(appName, () => AppNavigator);
