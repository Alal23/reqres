import React from 'react';
import {Snackbar} from 'react-native-paper';
import styles from './styles';

interface IProps {
  visible: boolean;
  onDismiss: () => void;
  message: string;
}

const ModalSnackBar = (props: IProps) => {
  const {visible, onDismiss, message} = props;
  return (
    <Snackbar
      visible={visible}
      duration={3000}
      onDismiss={onDismiss}
      style={styles.container}>
      {message}
    </Snackbar>
  );
};

export default ModalSnackBar;
