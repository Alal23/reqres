import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Button} from 'react-native-paper';
import {IPropsSubject} from '../../../types';

interface IPropsHeaderTab {
  data: IPropsSubject[];
  onSelect: (name: string) => void;
}

const HeaderTab: React.FC<IPropsHeaderTab> = props => {
  const {data, onSelect} = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onPressSelect = (index: number) => {
    setSelectedIndex(index);
    onSelect(data[index].name);
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <Button
            key={index}
            mode={selectedIndex === index ? 'contained' : 'outlined'}
            style={styles.buttonContainer}
            onPress={() => onPressSelect(index)}>
            {item.name}
          </Button>
        ))}
      </ScrollView>
    </View>
  );
};

export default HeaderTab;
