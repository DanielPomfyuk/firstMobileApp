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
const { width, height } = Dimensions.get('window')
function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
class PlayScreen extends Component {
    constructor() {
        super()
        const firstId = between(0, 6)
        const secondId = between(0, 6)
        this.state = {
            failedCandidates: [],
            activeWinnerId: NaN,
            leftCurrentPlayer: candidatesData[firstId],
            rightCurrentPlayer: candidatesData[secondId]
        }
        this.changePlayer = this.changePlayer.bind(this)
        this.addFailedCandidate = this.addFailedCandidate.bind(this)
    }
    generateRandomCandidateFromRemaining() {
        const initialIdsArray = candidatesData.map(candidate => candidate.id)
        const arrayWithRemainingCandidates = initialIdsArray.filter(candidateId =>
            ![...this.state.failedCandidates, this.state.activeWinnerId].includes(candidateId))
        const a = between(0, arrayWithRemainingCandidates.length)
        console.log("new candidate "+ candidatesData.find(cand=>cand.id===arrayWithRemainingCandidates[a]).name)
        return arrayWithRemainingCandidates[a]
    }
    addFailedCandidate(id) {
        this.setState((state) => {
            return { failedCandidates: [...state.failedCandidates, id] };
        },console.log(this.state.failedCandidates));
    }
    changePlayer(idOfWinner, idOfLooser) {
        console.log("idOfWinner " + idOfWinner + " idOfLooser " + idOfLooser)
        this.addFailedCandidate(idOfLooser)
        this.setState((state) => {
            return { activeWinnerId: idOfWinner };
        },()=>this.switchFailedCandidate());
    }
    switchFailedCandidate() {
        this.setState(state => {
            const randomId = this.generateRandomCandidateFromRemaining()
            const candidate = candidatesData.find(cand => cand.id === randomId )
            console.log(candidate.name)
            return (state.activeWinnerId === state.leftCurrentPlayer.id ? 
                { rightCurrentPlayer: candidate } : 
                { leftCurrentPlayer: candidate })
        },()=>{console.log(this.state.leftCurrentPlayer.id+" "+this.state.rightCurrentPlayer.id)}) 
    }

    render() {
        return (
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
            </View>
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