import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackNavigationTypes, routesEnum} from '@routes/index';

type Navigation = NativeStackNavigationProp<
  RootStackNavigationTypes,
  routesEnum.UserMain
>;
export interface IProps {
  navigation: Navigation;
}

export interface ListItemProps {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}
