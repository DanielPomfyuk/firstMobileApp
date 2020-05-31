import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from "react-native";
const {width,height} = Dimensions.get('window')
class HomePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{...StyleSheet.absoluteFill}}>
                    <Image style={styles.image} source={require('../assets/bg.jpg')}/>
                </View>
                <View style={styles.buttonContainer} >
                    <View style={styles.button}>
                        <Text style={styles.text}>Let`s play!</Text>
                    </View>
                </View>
            </View>
        );
    }
}
export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
        justifyContent:"flex-end"
    },
    image:{
        flex:1,
        height:null,
        width:null
    },
    buttonContainer:{
        height:height/4
    },
    button:{
        height:70,
        backgroundColor:"white",
        marginHorizontal:20,
        borderRadius:35,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
        textTransform:"uppercase"
    }
});