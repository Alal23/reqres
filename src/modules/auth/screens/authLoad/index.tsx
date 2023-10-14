import {useAppSelector} from '@hook/useStore';
import {routesEnum} from '@routes/index';
import {useEffect} from 'react';
import {IProps} from './types';

const AuthLoad = (props: IProps) => {
  const {navigation} = props;
  const {token} = useAppSelector(state => state.auth);
  useEffect(() => {
    if (token === '') {
      navigation.replace(routesEnum.AuthLogin);
    } else {
      navigation.replace(routesEnum.UserMain);
    }
  }, [navigation, token]);
  return null;
};

export default AuthLoad;
