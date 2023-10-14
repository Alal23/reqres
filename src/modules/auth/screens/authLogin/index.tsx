import {View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Button, TextInput} from 'react-native-paper';
import {routesEnum} from '@routes/index';
import {isValidEmail} from '@configs/helper';
import {IProps} from './types';
import {useLogin} from '@modules/auth/hooks';
import {ModalSnackBar} from 'src/components/modal';
import {actions as AuthActions} from '@modules/auth/stores';
import {useAppDispatch} from '@hook/useStore';

const AuthLogin = (props: IProps) => {
  const {navigation} = props;
  const {mutate: mutationLogin, isLoading, error: messageError} = useLogin();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const {email, password} = form;
  const [errorForm, setErrorForm] = useState({
    email: '',
    password: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const onChangeText = (key: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [`${key}`]: value,
    }));
    let validationForm = value.length < 6 ? 'Password minimal 6 karakter' : '';
    if (key === 'email') {
      validationForm = !isValidEmail(value) ? 'Email tidak valid' : '';
    }
    setErrorForm(prev => ({
      ...prev,
      [`${key}`]: validationForm,
    }));
  };
  const onLogin = () => {
    mutationLogin(
      {
        email,
        password,
      },
      {
        onSuccess: data => {
          dispatch(AuthActions.AuthSetToken(data?.data?.token));
          navigation.replace(routesEnum.UserMain);
        },
        onError: (error: any) => {
          console.log('error', error.response.data);
          setIsVisible(true);
        },
      },
    );
  };
  const isValidationAuth =
    email.length === 0 ||
    password.length === 0 ||
    errorForm.email !== '' ||
    errorForm.password !== '';
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Email"
        placeholder="Email"
        style={styles.input}
        value={email}
        error={errorForm.email !== ''}
        onChangeText={value => onChangeText('email', value)}
      />
      <View style={styles.mb16} />
      <TextInput
        mode="outlined"
        label="Password"
        placeholder="Password"
        style={styles.input}
        value={password}
        error={errorForm.password !== ''}
        secureTextEntry={!isShowPassword}
        right={
          <TextInput.Icon
            icon={!isShowPassword ? 'eye-off' : 'eye'}
            onPress={() => setIsShowPassword(prev => !prev)}
          />
        }
        onChangeText={value => onChangeText('password', value)}
      />
      <View style={styles.mb32} />
      <View style={styles.center}>
        <Button
          loading={isLoading}
          mode="contained"
          style={styles.button}
          disabled={isValidationAuth}
          onPress={onLogin}>
          Masuk
        </Button>
      </View>
      <ModalSnackBar
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        message={messageError?.response?.data?.error ?? ''}
      />
    </View>
  );
};

export default AuthLogin;
