import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackNavigationTypes, routesEnum} from '@routes/index';

type Navigation = NativeStackNavigationProp<
  RootStackNavigationTypes,
  routesEnum.UserAdd
>;
export interface IProps {
  navigation: Navigation;
  route: {
    params: Partial<ListItemProps>;
  };
}

export interface FormProps {
  firstName: string;
  lastName: string;
  job?: string;
  email: string;
}
export interface ListItemProps {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  job?: string;
}
