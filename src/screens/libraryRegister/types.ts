import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackNavigationTypes, routesEnum} from '../../routes';

export type Navigation = NativeStackNavigationProp<
  RootStackNavigationTypes,
  routesEnum.LibraryRegister
>;

export interface IProps {
  navigation: Navigation;
}
