import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

export enum routesEnum {
  LibraryMain = 'LibraryMain',
  LibraryRegister = 'LibraryRegister',
}

export type RootStackNavigationTypes = {
  [routesEnum.LibraryMain]: undefined;
  [routesEnum.LibraryRegister]: undefined;
};
const Stack = createNativeStackNavigator<RootStackNavigationTypes>();
const {Navigator} = Stack;
const {Screen} = Stack;

export {Stack, NavigationContainer, Navigator, Screen};
