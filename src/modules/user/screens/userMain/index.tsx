import {
  View,
  Alert,
  FlatList,
  ViewStyle,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, Appbar, Avatar, List} from 'react-native-paper';
import {actions as AuthActions} from '@modules/auth/stores';
import {useAppDispatch, useAppSelector} from '@hook/useStore';
import {routesEnum} from '@routes/index';
import {IProps, ListItemProps} from './types';
import styles from './styles';
import useGetUser from '@modules/user/hooks/useGetUser';
import {useDelUser} from '@modules/user/hooks';
import {actions as UserActions} from '@modules/user/stores';

const UserMain = (props: IProps) => {
  const {navigation} = props;
  const {userList} = useAppSelector(state => state.user);
  const {data, isSuccess, isLoading: isLoadingGetUser} = useGetUser();
  const {mutate: mutationDelUser, isLoading: isLoadingDelUser} = useDelUser();

  const getResponseUsers = useMemo(
    () => data?.data?.data ?? [],
    [data?.data?.data],
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(UserActions.UserGetData(getResponseUsers));
    }
  }, [dispatch, getResponseUsers, isSuccess]);
  const onLogOut = () => {
    Alert.alert('Perhatian', 'Apakah Anda yakin ingin keluar', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(AuthActions.AuthReset());
          navigation.replace(routesEnum.AuthLoad);
        },
      },
    ]);
  };
  const onAddUser = () => {
    navigation.navigate(routesEnum.UserAdd, {
      id: -99,
    });
  };
  const onUpdateUser = (itm: ListItemProps) => {
    navigation.navigate(routesEnum.UserAdd, {
      ...itm,
    });
  };
  const onDelete = (deletaData: ListItemProps) => {
    Alert.alert(
      'Perhatian',
      `Apakah Anda yakin ingin menghapus ${deletaData.first_name} ${deletaData.last_name}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            mutationDelUser(deletaData.id, {
              onSuccess() {
                console.log('delete berhasil');
                dispatch(UserActions.UserDeleteData(deletaData.id));
              },
              onError(error) {
                console.log('error', error.response.data);
              },
            });
          },
        },
      ],
    );
  };
  const onListLeft = (rest: ViewStyle, itm: ListItemProps) => {
    return <Avatar.Image {...rest} size={50} source={{uri: itm?.avatar}} />;
  };
  const onListRight = (rest: ViewStyle, itm: ListItemProps) => {
    return (
      <>
        <TouchableOpacity {...rest} onPress={() => onUpdateUser(itm)}>
          <List.Icon icon="account-edit" />
        </TouchableOpacity>

        <TouchableOpacity {...rest} onPress={() => onDelete(itm)}>
          <List.Icon icon="delete" color="red" />
        </TouchableOpacity>
      </>
    );
  };
  const renderItem: ListRenderItem<ListItemProps> = ({item}) => {
    return (
      <List.Item
        title={`${item.first_name} ${item.last_name}`}
        description={item.email}
        left={rest => onListLeft(rest as ViewStyle, item)}
        right={rest => onListRight(rest as ViewStyle, item)}
      />
    );
  };
  const renderListEmpty = () => {
    if (isLoadingGetUser || isLoadingDelUser) {
      return <ActivityIndicator />;
    }
    return null;
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Daftar User" />
        <Appbar.Action icon="logout" onPress={onLogOut} />
        <Appbar.Action icon="plus" onPress={onAddUser} />
      </Appbar.Header>
      <View style={styles.container}>
        <FlatList
          data={userList}
          renderItem={renderItem}
          ListEmptyComponent={renderListEmpty}
        />
      </View>
    </>
  );
};

export default UserMain;
