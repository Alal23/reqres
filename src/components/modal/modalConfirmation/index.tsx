import React from 'react';
import {Button, Dialog, Text} from 'react-native-paper';

interface IPropsModal {
  title: string;
  isVisible: boolean;
  onPressOk: () => void;
  onPressCancel: () => void;
}

const ModalConfirmation: React.FC<IPropsModal> = props => {
  const {onPressOk, onPressCancel, title, isVisible} = props;
  return (
    <Dialog visible={isVisible} onDismiss={onPressCancel}>
      <Dialog.Content>
        <Text variant="titleMedium">{title}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onPressCancel}>Cancel</Button>
        <Button onPress={onPressOk}>Ok</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ModalConfirmation;
