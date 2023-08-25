import {FlatList, ListRenderItem, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Badge} from 'react-native-paper';
import styles from './styles';
import {useGetListBook, useGetListSubject} from '../../hooks';
import {CardList, HeaderTab} from '../../components/card';
import {IPropsBook} from '../../types';
import {useAppSelector, useAppDispatch} from '../../hooks/useStore';
import {actions as libraryActions} from '../../stores';
import {routesEnum} from '../../routes';
import {IProps} from './types';

const LibraryMain: React.FC<IProps> = props => {
  const {navigation} = props;
  const {data: listSubject, isSuccess: isSuccessSubject} = useGetListSubject();
  const [subjectName, setSubjectName] = useState<string>('');
  const {data: listBook} = useGetListBook(subjectName);
  const listBookPickUpResponse = useAppSelector(state => state.listBookPickUp);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSuccessSubject) {
      const selectedSubject = listSubject[0]?.name;
      setSubjectName(selectedSubject.toString());
    }
  }, [isSuccessSubject, listSubject]);

  const renderSeperatorComponent = () => <View style={styles.mb16} />;
  const renderItem: ListRenderItem<IPropsBook> = ({item}) => {
    return (
      <CardList
        {...item}
        onPressAdd={() => onPressAddBookToPickUp(item)}
        listBookPickUpResponse={listBookPickUpResponse}
      />
    );
  };

  const onPressAddBookToPickUp = (bookData: IPropsBook) => {
    dispatch(libraryActions.onAddListPickUpBook(bookData));
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Library Main" />
        <View>
          <Appbar.Action
            icon="cart"
            onPress={() => navigation.navigate(routesEnum.LibraryRegister)}
          />
          <Badge style={styles.badgeContainer}>
            {listBookPickUpResponse.length}
          </Badge>
        </View>
      </Appbar.Header>
      <View style={styles.container}>
        <HeaderTab
          data={(listSubject as []) ?? []}
          onSelect={value => setSubjectName(value)}
        />
        <View style={styles.flatListContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listBook ?? []}
            renderItem={renderItem}
            contentContainerStyle={styles.pd16}
            ItemSeparatorComponent={renderSeperatorComponent}
          />
        </View>
      </View>
    </>
  );
};

export default LibraryMain;
