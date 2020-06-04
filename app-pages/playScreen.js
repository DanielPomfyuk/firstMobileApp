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
function between(min, max) { 
    return Math.floor(Math.random() * (max - min) + min)
  }
class PlayScreen extends Component {
    constructor(){
        super()
        const firstId=between(0,6)
        const secondId = between(0,6)
        this.state={
            candidates: candidatess,
            player1:candidatess[firstId],
            player2:candidatess[secondId]
        }
        console.log(candidatess)
        this.changePlayer = this.changePlayer.bind(this)
    }
    changePlayer=(id)=>{
        console.log(candidatess)
        if(candidatess.length<1){
            return
        }
        const newId = between(0,6)
        const theOldId = id===1?this.state.player2:this.state.player2
        if(candidatess[newId]){
            this.setState(state => (id===1?{
                player2: candidatess[newId]}:{player1: candidatess[newId]}));
        }
        else{
            this.changePlayer(id)
        }
        candidatess.slice[theOldId,1]
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