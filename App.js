import React, {useState} from 'react';
import { StyleSheet, Text, View ,Button,TextInput} from 'react-native';

export default function App() {
  const [enteredWord,setEnteredWord] = useState('');
  const [currentPhrase,setCurrentPhrase] = useState('');
  const pressHandler = (text)=>{
    setEnteredWord(text)
  }
  const addHandler = ()=>{
    setCurrentPhrase(currentPhrase=>[...currentPhrase," ",enteredWord])
    setEnteredWord('')
  }
  return (
    <View style={styles.container}>
      <View style={styles.enterArea}>
      <TextInput 
      placeholder="Ebalo" 
      onChangeText={pressHandler} 
      value={enteredWord}
      style={styles.input}>  
      </TextInput >
      <Button title="Add" onPress={addHandler}></Button>
      </View>
      <View style={styles.textHolder}>
  <Text style={styles.text}> You are a {currentPhrase}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#ff6361",
  },
  enterArea:{
    marginTop:50,
    marginLeft:30,
    width:"80%%",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  input:{
    width:"90%",
    height:40,
    backgroundColor: 'white',
    borderWidth:1,
    color:"black",
    fontSize:20
  },
  text:{
    textAlign:"center",
    color:"white",
    fontSize:30
  },
  textHolder:{
    margin:30,
    width:"80%"
  }
});
