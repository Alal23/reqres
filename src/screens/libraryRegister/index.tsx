import {View, FlatList, ListRenderItem} from 'react-native';
import React, {useState} from 'react';
import {Appbar, Button, Dialog, Modal, Text} from 'react-native-paper';
import styles from './styles';
import {CardList} from '../../components/card';
import {IPropsBook, IPropsModalBook} from '../../types';
import {useAppDispatch, useAppSelector} from '../../hooks/useStore';
import {actions as libraryActions} from '../../stores';
import {IProps} from './types';
import {
  ModalBookInformation,
  ModalConfirmation,
  ModalPickUpBook,
} from '../../components/modal';
import {useMutationBookDetail} from '../../hooks';
import moment from 'moment';

const LibraryRegister: React.FC<IProps> = props => {
  const {navigation} = props;
  const listBookPickUpResponse = useAppSelector(state => state.listBookPickUp);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedModalData, setSelectedModalData] =
    useState<null | IPropsModalBook>(null);

  const hideDialog = () => setVisible(false);
  const dispatch = useAppDispatch();
  const {mutate: mutationBookDetail} = useMutationBookDetail();
  const [isShoModalPick, setIsShowModalPickUp] = useState(false);

  const renderSeperatorComponent = () => <View style={styles.mb16} />;

  const onPressDelete = (idx: number) => {
    setSelectedIndex(idx);
    setVisible(true);
  };
  const renderItem: ListRenderItem<IPropsBook> = ({item, index}) => {
    return (
      <CardList
        {...item}
        onPressDelete={() => onPressDelete(index)}
        onPressDetail={() => onShowModal(item)}
        isCart
      />
    );
  };
  const onShowModal = (modalData: IPropsBook) => {
    mutationBookDetail(modalData.availability?.openlibrary_work, {
      onSuccess(data) {
        setIsShowModal(true);
        setSelectedModalData({
          ...modalData,
          ...data?.data,
        });
      },
      onError() {
        setIsShowModal(true);
        setSelectedModalData(modalData);
      },
    });
  };
  const onHideModal = () => setIsShowModal(false);

  const onPressConfirm = () => {
    dispatch(libraryActions.onRemoveListPickUpBook(selectedIndex));
    setVisible(false);
  };
  const onSubmitPickUp = (date: string, time: string) => {
    const submitData = {
      pickUpDate: moment(date).format('YYYY-MM-DD'),
      pickTime: time,
      listBookPickUpResponse,
    };
    console.log('submitData', submitData);
    setIsShowModalPickUp(false);
    dispatch(libraryActions.onResetListPickUpBook({}));
    navigation.pop();
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Library Register" />
        <Appbar.Action
          icon="content-save"
          onPress={() => setIsShowModalPickUp(true)}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listBookPickUpResponse}
            renderItem={renderItem}
            contentContainerStyle={styles.pd16}
            ItemSeparatorComponent={renderSeperatorComponent}
          />
        </View>
      </View>
      <ModalConfirmation
        isVisible={visible}
        title=" Are you sure want remove this book ?"
        onPressCancel={hideDialog}
        onPressOk={onPressConfirm}
      />
      <ModalBookInformation
        modalData={selectedModalData}
        isVisible={isShowModal}
        onHideModal={onHideModal}
      />
      <ModalPickUpBook
        isVisible={isShoModalPick}
        onHideModal={() => setIsShowModalPickUp(false)}
        onSubmitModal={(date, time) => onSubmitPickUp(date, time)}
      />
    </>
  );
};

export default LibraryRegister;
