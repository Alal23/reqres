import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as AuthScreen from '@modules/auth/screens';
import * as UserScreen from '@modules/user/screens';
import {RootStackNavigationTypes, routesEnum} from '../routes';

const Stack = createNativeStackNavigator<RootStackNavigationTypes>();
const {Navigator} = Stack;
const {Screen} = Stack;

const RootNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={routesEnum.AuthLoad} component={AuthScreen.AuthLoad} />
      <Screen name={routesEnum.AuthLogin} component={AuthScreen.AuthLogin} />
      <Screen name={routesEnum.UserMain} component={UserScreen.UserMain} />
      <Screen name={routesEnum.UserAdd} component={UserScreen.UserAdd} />
    </Navigator>
  );
};

export default RootNavigator;
