import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  mb8: {
    marginBottom: 8,
  },
  mb32: {
    marginBottom: 32,
  },
  input: {
    width: '100%',
  },
  button: {
    width: Dimensions.get('window').width / 2 - 16,
  },
  center: {
    alignItems: 'center',
  },
});
