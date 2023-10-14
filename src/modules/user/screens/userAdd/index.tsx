import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {FormProps, IProps} from './types';
import styles from './styles';
import {isValidEmail} from '@configs/helper';
import {useAppDispatch} from '@hook/useStore';
import {actions as UserActions} from '@modules/user/stores';
import {useUpdateUser, useAddUser} from '@modules/user/hooks';

const UserAdd = (props: IProps) => {
  const {
    navigation,
    route: {params},
  } = props;
  const {id} = params;
  const titleHeader = id === -99 ? 'Tambah User' : 'Edit User';
  const [form, setForm] = useState<Partial<FormProps>>({
    firstName: '',
    lastName: '',
    job: '',
    email: '',
  });
  const [errorForm, setErrorForm] = useState({
    firstName: '',
    lastName: '',
    job: '',
    email: '',
  });
  const {firstName, lastName, job, email} = form;
  const {mutate: mutationAddUser, isLoading} = useAddUser();
  const {mutate: mutationUpdateUser, isLoading: isLoadingUpdateUser} =
    useUpdateUser();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id !== -99) {
      setForm(prev => ({
        ...prev,
        firstName: params.first_name,
        lastName: params.last_name,
        job: params.job ?? '',
        email: params?.email,
      }));
    }
  }, [id, params]);
  const isValidationForm =
    firstName?.length === 0 ||
    lastName?.length === 0 ||
    (id === -99 && job?.length === 0) ||
    email?.length === 0 ||
    errorForm.firstName.length !== 0 ||
    errorForm.lastName.length !== 0 ||
    errorForm.job.length !== 0 ||
    errorForm.email.length !== 0;
  const onChangeText = (key: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [`${key}`]: value,
    }));
    let validationForm = value.length === 0 ? 'Field tidak boleh kosong' : '';
    if (key === 'firstName') {
      validationForm = value.length < 3 ? 'Field minimal 3 karakter' : '';
    }
    if (key === 'job') {
      validationForm =
        value.length === 0 && id === -99 ? 'Field tidak boleh kosong' : '';
    }
    if (key === 'email') {
      validationForm = !isValidEmail(value) ? 'Email tidak valid' : '';
    }
    setErrorForm(prev => ({
      ...prev,
      [`${key}`]: validationForm,
    }));
  };
  const onRegisterUser = () => {
    if (id === -99) {
      mutationAddUser(
        {
          name: firstName as string,
          job: job as string,
        },
        {
          onSuccess(userSuccess) {
            console.log('userSuccess', userSuccess?.data);
            dispatch(
              UserActions.UserAddData({
                id: userSuccess?.data.id,
                first_name: firstName,
                last_name: lastName,
                job: job,
                email: email,
                avatar: 'https://source.unsplash.com/random',
              }),
            );
            navigation.pop();
          },
          onError(error) {
            console.log('error', error);
          },
        },
      );
    } else {
      mutationUpdateUser(
        {
          id: id as number,
          name: firstName as string,
          job: job as string,
        },
        {
          onSuccess(userSuccess) {
            console.log('userSuccess', userSuccess?.data);
            dispatch(
              UserActions.UserUpdateData({
                id: id,
                first_name: firstName,
                last_name: lastName,
                job: job,
                email: email,
                avatar: params.avatar,
              }),
            );
            navigation.pop();
          },
          onError(error) {
            console.log('error', error);
          },
        },
      );
    }
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={titleHeader} />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <TextInput
          mode="outlined"
          label="First Name"
          placeholder="First Name"
          value={firstName}
          error={errorForm.firstName !== ''}
          onChangeText={value => onChangeText('firstName', value)}
        />
        <View style={styles.mb16} />
        <TextInput
          mode="outlined"
          label="Last Name"
          placeholder="Last Name"
          value={lastName}
          error={errorForm.lastName !== ''}
          onChangeText={value => onChangeText('lastName', value)}
        />
        <View style={styles.mb16} />

        <>
          <TextInput
            mode="outlined"
            label="Job"
            placeholder="Job"
            value={job}
            error={errorForm.job !== ''}
            onChangeText={value => onChangeText('job', value)}
          />
          <View style={styles.mb16} />
        </>

        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Email"
          value={email}
          error={errorForm.email !== ''}
          onChangeText={value => onChangeText('email', value)}
        />
        <View style={styles.mb32} />

        <Button
          loading={isLoading || isLoadingUpdateUser}
          mode="contained"
          disabled={isValidationForm}
          onPress={onRegisterUser}>
          Submit
        </Button>
      </ScrollView>
    </>
  );
};

export default UserAdd;
