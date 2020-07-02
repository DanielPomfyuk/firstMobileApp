import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from "react-native";
import Svg, { Text as SVGText, TSpan } from "react-native-svg"
import candidates from "./candidates"
const { width, height } = Dimensions.get('window')
const arrBack = "\u2190"

const WinnerScreen = (props) => {
    winner = candidates.find(cand=>cand.id===props.navigation.getParam("winner"))
    return(<View style={styles.mainContainer}>
        <Svg  width={width} height={height/10} >
                        <SVGText fill="white"
                            stroke="white"
                            fontSize="40"
                            fontWeight="bold"
                            x="50"
                            y="100"
                            textAnchor="middle">
                            <TSpan x={width/2-10} y={height/4 -120} dx="0 0 0 0 20 20 0 0 0">IT`SAMATCH!</TSpan>
                        </SVGText>
        </Svg>
        <View style={styles.cardsContainer}>
        <View 
            style={styles.cardContainer}>
            <Image style={styles.image} source={winner.pic} />
            <View style={styles.textContainer}><Text style={styles.text}>{winner.name}</Text></View>
        </View>
    </View>
    <View style={styles.buttonsContainer}>
                        <TouchableOpacity  
                        onPress={()=>props.navigation.navigate('Home') } 
                        style={styles.button}>
                        <Text style={styles.buttonText}>{arrBack}</Text>
                        </TouchableOpacity>
                       
                    </View>
    </View>)
}
export default WinnerScreen;

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"#eb5a46",
        justifyContent:"center",
        alignItems:"center"
    },
    cardsContainer: {
        marginTop:0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: width,
        height:width+50,
    },
    cardContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        position: "relative",
        justifyContent: "center",
        overflow:"hidden"
    },
    image: {
        alignSelf: 'center',
        height: "80%",
        width: "100%",
        borderWidth:4,
        borderColor:"white",

    },
    textContainer: {
        height: 50,
        width: "100%",
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"white"
    },
    text: {
        color: "#cf513d",
        fontWeight: "bold",
        fontSize: 20,
        textTransform: "capitalize"
    },
    buttonsContainer:{
        width:width/2,
        height:80,
        alignSelf:"center",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    button:{
        borderColor:"white",
        borderWidth:3,
        width:width/4,
        height:width/4,
        borderRadius:width/8,
        alignItems:"center",
        justifyContent:"center"
    },
    buttonText:{
        color:"white",
        fontSize:50
    }
});