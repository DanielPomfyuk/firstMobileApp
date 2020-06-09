import React, { Component, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import candidatesData from "./candidates"
import WinnerScreen from "./winnerScreen";
const { width, height } = Dimensions.get('window')
function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
class PlayScreen extends Component {
    constructor() {
        super()
        let firstId = between(0, candidatesData.length)
        let secondId = between(0, candidatesData.length)
        while(secondId===firstId){
            secondId= between(0,candidatesData.length)
        }
        this.state = {
            gameOver:false,
            failedCandidates: [],
            activeWinnerId: NaN,
            gameLenght:between(3,candidatesData.length-1),
            roundsCounter:0,
            leftCurrentPlayer: candidatesData[firstId],
            rightCurrentPlayer: candidatesData[secondId]
        }
        console.log(this.state.gameLenght)
        this.changePlayer = this.changePlayer.bind(this)
        this.addFailedCandidate = this.addFailedCandidate.bind(this)
        this.finishTheGame = this.finishTheGame.bind(this)
        this.switchFailedCandidate = this.switchFailedCandidate.bind(this)
    }
    generateRandomCandidateFromRemaining() {
        const initialIdsArray = candidatesData.map(candidate => candidate.id)
        const arrayWithRemainingCandidates = initialIdsArray.filter(candidateId =>
            ![...this.state.failedCandidates, this.state.activeWinnerId].includes(candidateId))
        return arrayWithRemainingCandidates[between(0, arrayWithRemainingCandidates.length)]
    }
    finishTheGame(){
        this.setState(state=>{
           return {gameOver:true}
        })
    }
    addFailedCandidate(id) {
        this.setState((state) => {
            return { failedCandidates: [...state.failedCandidates, id] };
        });
    }
    changePlayer(idOfWinner, idOfLooser) {
        this.addFailedCandidate(idOfLooser)
        this.setState((state) => {
            return { activeWinnerId: idOfWinner };
        },()=>this.switchFailedCandidate());
    }
    switchFailedCandidate() {
        console.log(this.state.roundsCounter)
        this.setState(state => {
            const randomId = this.generateRandomCandidateFromRemaining()
            if(typeof randomId === 'undefined'||this.state.roundsCounter===this.state.gameLenght){
                this.finishTheGame()
                return
            }
            const candidate = candidatesData.find(cand => cand.id === randomId )
            return (state.activeWinnerId === state.leftCurrentPlayer.id ? 
                { rightCurrentPlayer: candidate,roundsCounter:state.roundsCounter+1 } : 
                { leftCurrentPlayer: candidate,roundsCounter:state.roundsCounter+1 })
        }) 
    }

    render() {
        return (!this.state.gameOver?
            <View style={styles.container}>
                <View style={styles.titleContainer}><Text style={styles.titleText}>Who`d you rather?</Text></View>
                <View style={styles.cardsContainer}>
                    <TouchableOpacity onPress={
                        () => this.changePlayer(this.state.leftCurrentPlayer.id,
                            this.state.rightCurrentPlayer.id)}
                        style={styles.cardContainer}>
                        <Image style={styles.image} source={this.state.leftCurrentPlayer.pic} />
                        <View style={styles.textContainer}><Text style={styles.text}>{this.state.leftCurrentPlayer.name}</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={
                        () => this.changePlayer(this.state.rightCurrentPlayer.id,
                        this.state.leftCurrentPlayer.id)} 
                        style={styles.cardContainer}>
                        <Image style={styles.image} source={this.state.rightCurrentPlayer.pic} />
                        <View style={styles.textContainer}><Text style={styles.text}>{this.state.rightCurrentPlayer.name}</Text></View>
                    </TouchableOpacity>
                </View>
            </View>:<WinnerScreen id={this.state.activeWinnerId}/>
        );
    }
}
export default PlayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ef6d55"
    },
    titleContainer: {
        position: "absolute",
        width: "100%",
        height: 100,
        marginTop: 20,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center"
    },
    titleText: {
        fontSize: 35,
        color: "#ef6d55",
        fontWeight: "bold"
    },
    cardsContainer: {
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: width,
        height: height / 1.5,
        marginTop: 150
    },
    cardContainer: {
        width: "48%",
        height: "100%",
        display: "flex",
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        justifyContent: "flex-end"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    textContainer: {
        height: 30,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#cf5d48",
        opacity: 0.8
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textTransform: "capitalize"
    }
});