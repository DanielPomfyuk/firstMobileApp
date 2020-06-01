import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from "react-native";
import { color } from "react-native-reanimated";
const { width, height } = Dimensions.get('window')
class PlayScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/playScreenBg.png')}/>
                <View style={styles.titleContainer}><Text style={styles.titleText}>Who`d you rather?</Text></View>
                <View style={styles.cardsContainer}>
                    <View style={styles.cardContainer}>
                    <Image style={styles.image}source={require('../assets/firstContestant.jpg')}/>
                    <View style={styles.textContainer}><Text style={styles.text}>Harry Styles</Text></View>
                    </View>
                    <View style={styles.cardContainer}>
                    <Image style={styles.image}source={require('../assets/secondContestant.png')}/>
                    <View style={styles.textContainer}><Text style={styles.text}>Jake Gyllenhaal</Text></View>
                    </View>
                </View>
            </View>
        );
    }
}
export default PlayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer:{
        position:"absolute",
        width:"100%",
        height:100,
        marginTop:20,
        alignItems:"center",
        justifyContent:"center"
    },
    titleText:{
        fontSize:35,
        color:"white",
        fontWeight:"bold"
    },
    cardsContainer:{
        position:"absolute",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        width: width,
        height: height/3,
        marginTop:150
    },
    cardContainer:{
        width:"45%",
        height:"100%",
        display:"flex",
    },
    image:{
        width:"100%",
        height:"100%"
    },
    textContainer:{
        position:"absolute",
        marginTop:200,
        width:"100%",
        alignItems:"center",
        backgroundColor:"black",
        },
    text:{
        color:"white",
        fontWeight:"bold",
        fontSize:20,
        textTransform:"capitalize"
    }
});