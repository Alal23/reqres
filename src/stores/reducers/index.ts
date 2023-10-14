import {reducer as authReducer} from '@modules/auth/stores';
import {reducer as authUser} from '@modules/user/stores';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

const persistconfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['user'],
};

const rootReducer = combineReducers({
  auth: persistReducer(persistconfig, authReducer),
  user: authUser,
});

export default rootReducer;
