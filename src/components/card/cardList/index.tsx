import {View, Text, Image} from 'react-native';
import React from 'react';
import {Button, Card} from 'react-native-paper';
import {IPropsBook} from '../../../types';
import styles from './styles';

interface IPropsCardList extends IPropsBook {
  onPressAdd?: () => void;
  onPressDelete?: () => void;
  onPressDetail?: () => void;
  listBookPickUpResponse?: IPropsBook[];
  isCart?: boolean;
}

const CardList: React.FC<IPropsCardList> = props => {
  const {
    title,
    cover_edition_key,
    authors,
    cover_link,
    onPressAdd,
    onPressDelete,
    onPressDetail,
    listBookPickUpResponse = [],
    isCart = false,
  } = props;

  const rightContent = (editionNumber: string) => {
    return (
      <View style={styles.ph8}>
        <Text>{editionNumber}</Text>
      </View>
    );
  };

  const leftContent = (imgLink: string) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{uri: imgLink}}
          resizeMode="contain"
          style={styles.imageContainer}
        />
      </View>
    );
  };
  return (
    <Card>
      <Card.Title
        title={title}
        subtitle={authors[0].name}
        right={() => rightContent(cover_edition_key)}
        left={() => leftContent(cover_link)}
      />
      <Card.Actions>
        {isCart ? (
          <>
            <Button icon="information" mode="contained" onPress={onPressDetail}>
              Detail Book
            </Button>
            <View style={styles.mh16} />
            <Button icon="delete" mode="contained" onPress={onPressDelete}>
              remove
            </Button>
          </>
        ) : (
          <Button
            mode="contained"
            onPress={onPressAdd}
            disabled={
              listBookPickUpResponse.findIndex(item => item.title === title) !==
              -1
            }>
            Borrow
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};

export default CardList;
