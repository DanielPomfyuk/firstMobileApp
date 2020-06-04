import React,{ Component,useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import candidatess from "./candidates"
const { width, height } = Dimensions.get('window')
class PlayScreen extends Component {
   
    constructor(){
        super()
        this.state={
            candidates: candidatess,
            player1:candidatess.find(cand=>cand.id===3),
            player2:candidatess.find(cand=>cand.id===5)
        }
        this.changePlayer = this.changePlayer.bind(this)
    }
    changePlayer=(id)=>{
        this.setState(state => (id===1?{
            player2: {...state.player1,pic:state.player1.pic}
          }:{player1: {...state.player1,pic:state.player2.pic}}));
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/playScreenBg.png')}/>
                <View style={styles.titleContainer}><Text style={styles.titleText}>Who`d you rather?</Text></View>
                <View style={styles.cardsContainer}>
                    <TouchableOpacity onPress={()=>this.changePlayer(1)} style={styles.cardContainer}>
                        <Image style={styles.image}source={this.state.player1.pic}/>
                        <View style={styles.textContainer}><Text style={styles.text}>{this.state.player1.name}</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.changePlayer(2)}style={styles.cardContainer}>
                        <Image style={styles.image}source={this.state.player2.pic}/>
                        <View style={styles.textContainer}><Text style={styles.text}>{this.state.player2.name}</Text></View>
                    </TouchableOpacity>
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
        borderRadius:10,
        overflow:"hidden"
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