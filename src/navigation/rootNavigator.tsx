import {Platform} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as LibraryScreen from '../screens';
import {RootStackNavigationTypes, routesEnum} from '../routes';

const Stack = createNativeStackNavigator<RootStackNavigationTypes>();
const {Navigator} = Stack;
const {Screen} = Stack;

const RootNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.OS !== 'android',
      }}>
      <Screen
        name={routesEnum.LibraryMain}
        component={LibraryScreen.LibraryMain}
      />
      <Screen
        name={routesEnum.LibraryRegister}
        component={LibraryScreen.LibraryRegister}
      />
    </Navigator>
  );
};

export default RootNavigator;
