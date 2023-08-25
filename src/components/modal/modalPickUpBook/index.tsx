import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Dialog, Text, TextInput} from 'react-native-paper';
import {DatePickerInput, TimePickerModal} from 'react-native-paper-dates';
import styles from './styles';

interface IPropsPickDateBook {
  isVisible: boolean;
  onHideModal: () => void;
  onSubmitModal: (date: Date, time: string) => void;
}
const ModalPickUpBook: React.FC<IPropsPickDateBook> = props => {
  const {isVisible, onHideModal, onSubmitModal} = props;
  const [inputDate, setInputDate] = React.useState('');
  const [isShowTime, setIsShowTime] = React.useState(false);
  const [timeValue, setTimeValue] = useState('');
  const onDismiss = React.useCallback(() => {
    setIsShowTime(false);
  }, [setIsShowTime]);

  const onConfirm = React.useCallback(
    ({hours, minutes}: {hours: number; minutes: number}) => {
      setIsShowTime(false);
      console.log({hours, minutes});
      setTimeValue(`${hours}:${minutes}`);
    },
    [setIsShowTime],
  );

  const onSubmit = () => {
    onSubmitModal(inputDate, timeValue);
    setTimeValue('');
    setInputDate('');
  };

  return (
    <Dialog visible={isVisible} onDismiss={onHideModal}>
      <Dialog.Title>Form Pick Up</Dialog.Title>
      <Dialog.Content>
        <DatePickerInput
          locale="en"
          label="Pick Date"
          value={inputDate}
          onChange={(d: Date) => setInputDate(d)}
          inputMode="start"
        />
        <View style={styles.mb16} />
        <TouchableOpacity onPress={() => setIsShowTime(true)}>
          <TextInput
            mode="outlined"
            label="Pick Up Time"
            placeholder="Pick Up Time"
            editable={false}
            value={timeValue}
          />
        </TouchableOpacity>

        <TimePickerModal
          visible={isShowTime}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          use24HourClock
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onSubmit}>Submit</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ModalPickUpBook;
