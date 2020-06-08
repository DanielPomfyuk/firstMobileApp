import React from "react";
import { 
    View,
    Text,
    StyleSheet,Image
} from "react-native";
import candidates from "./candidates"

const WinnerScreen = (props) => {
    winner = candidates.find(cand=>cand.id===props.id)
    return(<View style={styles.container}>
        <View style={styles.winnerContaine}>
        <Image style={styles.image}source={winner.pic}/>
    <View style={styles.textContainer}><Text style={styles.text}>{winner.name} is your date </Text></View>
    </View>
    </View>)
}
export default WinnerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#ef6d55"
    },
    winnerContaine:{
        width:"100%",
        height:"80%",
        position:"relative"
    },
    image:{
        width:"100%",
        height:"100%"
    },
    text:{
        fontSize:30,
        color:"white",
        fontWeight:"bold"
    },
    textContainer:{
        position:"absolute",
        marginTop:"80%",
    }
});