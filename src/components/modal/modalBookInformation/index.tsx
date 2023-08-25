import {Image, ScrollView, View} from 'react-native';
import React from 'react';
import {Appbar, Modal, Text} from 'react-native-paper';
import styles from './styles';
import {IPropsModalBook} from '../../../types';
import moment from 'moment';

interface IPropsBookInformation {
  isVisible: boolean;
  onHideModal: () => void;
  modalData: null | IPropsModalBook;
}
const ModalBookInformation: React.FC<IPropsBookInformation> = props => {
  const {isVisible, onHideModal, modalData} = props;
  console.log('modalData', modalData);
  return (
    <Modal
      visible={isVisible}
      onDismiss={onHideModal}
      contentContainerStyle={styles.containerStyle}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onHideModal} />
        <Appbar.Content title={modalData?.title} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.topContent}>
          <View>
            {modalData !== null && (
              <Image
                source={{uri: modalData?.cover_link}}
                style={styles.imageContainer}
                resizeMode="contain"
              />
            )}
          </View>
          <View style={styles.topRightcontent}>
            <Text variant="titleMedium">{modalData?.title}</Text>
            <Text>{modalData?.authors[0].name}</Text>
            <View>
              <Text>Fist Public Year: {modalData?.first_publish_year}</Text>
              <Text>
                Created:{' '}
                {moment(modalData?.created?.value).format('DD-MM-YYYY')}
              </Text>
              <Text>
                Last Modified:{' '}
                {moment(modalData?.last_modified?.value).format('DD-MM-YYYY')}
              </Text>
              <Text>Revision: {modalData?.revision}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text>{modalData?.description?.value}</Text>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalBookInformation;
