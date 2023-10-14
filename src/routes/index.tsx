import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ListItemProps} from '@modules/user/screens/userAdd/types';

export enum routesEnum {
  AuthLoad = 'AuthLoad',
  AuthLogin = 'AuthLogin',
  UserMain = 'UserMain',
  UserAdd = 'UserAdd',
}

export type RootStackNavigationTypes = {
  [routesEnum.AuthLoad]: undefined;
  [routesEnum.AuthLogin]: undefined;
  [routesEnum.UserMain]: undefined;
  [routesEnum.UserAdd]: Partial<ListItemProps>;
};
const Stack = createNativeStackNavigator<RootStackNavigationTypes>();
const {Navigator} = Stack;
const {Screen} = Stack;

export {Stack, NavigationContainer, Navigator, Screen};
