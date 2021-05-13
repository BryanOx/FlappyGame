import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    game_over: {
      fontSize: 30
    },
    retry_buttom: {
      position: 'absolute',
      bottom: 100,
      backgroundColor: 'red',
      borderTopStartRadius: 30,
      borderBottomEndRadius: 30,
      width: 120,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    curr_score: {
      position: 'absolute',
      top: 25,
      fontSize: 24,
      color: 'gray',
      alignSelf: 'center'
    }
  }
);

export default styles