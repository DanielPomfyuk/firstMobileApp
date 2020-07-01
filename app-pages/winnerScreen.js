import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";
import candidates from "./candidates"
import Svg, { Image, Polygon, ClipPath, Rect, Text as SVGText, TSpan } from "react-native-svg"
const { width, height } = Dimensions.get('window')

const WinnerScreen = (props) => {
    winner = candidates.find(cand=>cand.id===props.navigation.getParam("winner"))
    return(<View style={styles.container}>
        <View style={styles.matchContainer}>
        <Svg  viewBox={`0 0 160 160`}>
        <Image x="0" y="0" width="160" height="160" href={winner.pic} />
    </Svg>
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
        backgroundColor:"#88deb0"
    },
    matchContainer:{
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