import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackNavigationTypes, routesEnum} from '@routes/index';

type Navigation = NativeStackNavigationProp<
  RootStackNavigationTypes,
  routesEnum.AuthLogin
>;
export interface IProps {
  navigation: Navigation;
}
