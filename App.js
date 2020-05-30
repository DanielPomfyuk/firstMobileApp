import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Press to puk"></Button>
      <Text style={styles.text}>Zalupa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color:"white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:"white",
    fontSize:30
  }
});
